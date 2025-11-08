"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import FormFile from "@/components/ui/form-file";
import { Form } from "@/components/ui/form";
import { AttachmentsFormValues, getAttachmentsSchema, UploadedFile } from "@/validations/attachments.validation";
import { useRegistrationMutation } from "@/hooks/use-registration-mutation";
import { loadData } from "@/lib/local-storage";
import { transformToApiPayload } from "@/lib/registration-mapper";
import { uploadRegistrationImage, deleteRegistrationImage } from "@/services/registration.service";
import type { StudentInfoFormValues } from "@/validations/student-info.validation";
import type { StudentClassInfo } from "@/validations/student-info.validation";
import type { FamilyInfoFormValues } from "@/validations/family-info.validation";
import type { EducationHealthFormValues } from "@/validations/education-health.validation";
import useTextDirection from "@/hooks/use-text-direction";

// Map field names to image types (0-3)
const IMAGE_TYPE_MAP: Record<string, string> = {
    studentPhotos: "0", // student_photo
    birthCertificate: "1", // birth_certificate
    familyCard: "2", // family_card
    parentsId: "3", // parents_id
};

interface UploadedImage {
    ids: string;
    path: string;
    type: string;
}

interface FileToUpload {
    file: File;
    type: string;
    fieldName: string;
    uploadedFile: UploadedFile;
}

export default function AttachmentsPage() {
    const t = useTranslations("register.attachments");
    const tValidations = useTranslations("register.attachments.validation");
    const tCommon = useTranslations("register.studentInformation");
    const tToast = useTranslations("toast");
    const { locale } = useTextDirection();
    const { push } = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<AttachmentsFormValues>({
        resolver: zodResolver(getAttachmentsSchema(tValidations)),
        defaultValues: {
            parentsId: [],
            birthCertificate: [],
            studentPhotos: [],
            familyCard: [],
        },
    });

    const mutation = useRegistrationMutation({
        onSuccess: () => {
            toast.success(tToast("registration_success"));
            clearLocalStorage();
            push(`/${locale}/registration/thank-you`);
        },
        onError: () => {
            toast.error(tToast("registration_error"));
        },
    });

    // Helper: Clear all registration data from localStorage
    const clearLocalStorage = () => {
        localStorage.removeItem("class_info");
        localStorage.removeItem("student_info");
        localStorage.removeItem("family_info");
        localStorage.removeItem("education_health");
    };

    // Helper: Load and validate all form data
    const loadAllFormData = () => {
        const classInfo = loadData<StudentClassInfo>("class_info");
        const studentInfo = loadData<StudentInfoFormValues>("student_info");
        const familyInfo = loadData<FamilyInfoFormValues>("family_info");
        const educationHealth = loadData<EducationHealthFormValues>("education_health");

        if (!classInfo || !studentInfo || !familyInfo || !educationHealth) {
            toast.warning(tToast("complete_steps"));
            return null;
        }

        return {
            mergedStudentInfo: {
                ...studentInfo,
                child_school: classInfo.child_school || "",
                child_next_class: classInfo.child_next_class,
            },
            familyInfo,
            educationHealth,
        };
    };

    // Helper: Collect files that need to be uploaded
    const collectFilesToUpload = (values: AttachmentsFormValues): FileToUpload[] => {
        const filesToUpload: FileToUpload[] = [];

        Object.entries(values).forEach(([fieldName, uploadedFiles]) => {
            if (!uploadedFiles) return;

            const imageType = IMAGE_TYPE_MAP[fieldName] || "0";
            uploadedFiles.forEach((uploaded) => {
                if (!uploaded.uploaded) {
                    filesToUpload.push({
                        file: uploaded.file,
                        type: imageType,
                        fieldName,
                        uploadedFile: uploaded,
                    });
                }
            });
        });

        return filesToUpload;
    };

    // Helper: Collect already uploaded images
    const collectUploadedImages = (values: AttachmentsFormValues): UploadedImage[] => {
        const uploadedImages: UploadedImage[] = [];

        Object.entries(values).forEach(([fieldName, uploadedFiles]) => {
            if (!uploadedFiles) return;

            const imageType = IMAGE_TYPE_MAP[fieldName] || "0";
            uploadedFiles.forEach((uploaded) => {
                if (uploaded.uploaded && uploaded.uploadedId && uploaded.path) {
                    uploadedImages.push({
                        ids: uploaded.uploadedId,
                        path: uploaded.path,
                        type: imageType,
                    });
                }
            });
        });

        return uploadedImages;
    };

    // Helper: Upload a single file
    const uploadSingleFile = async (fileData: FileToUpload): Promise<UploadedImage> => {
        const uploadResponse = await uploadRegistrationImage(fileData.file, fileData.type);

        // Update the form field to mark as uploaded
        const currentFieldValue = form.getValues(fileData.fieldName as keyof AttachmentsFormValues);
        const updatedFiles = (currentFieldValue as UploadedFile[] | undefined)?.map((uf) =>
            uf.id === fileData.uploadedFile.id
                ? {
                      ...uf,
                      path: uploadResponse.path,
                      uploaded: true,
                      uploadedId: uploadResponse.id,
                  }
                : uf
        );

        if (updatedFiles) {
            form.setValue(fileData.fieldName as keyof AttachmentsFormValues, updatedFiles as any);
        }

        return {
            ids: uploadResponse.id,
            path: uploadResponse.path,
            type: uploadResponse.type,
        };
    };

    // Helper: Upload multiple files with cleanup on failure
    const uploadAllFiles = async (filesToUpload: FileToUpload[]): Promise<UploadedImage[]> => {
        const uploadedImages: UploadedImage[] = [];
        const uploadedIds: string[] = [];

        const uploadingToast = toast.loading(
            `${tToast("uploading_images") || "Uploading images"} (${filesToUpload.length} ${tToast("files") || "files"})...`
        );

        try {
            for (const fileData of filesToUpload) {
                try {
                    const uploadedImage = await uploadSingleFile(fileData);
                    uploadedImages.push(uploadedImage);
                    uploadedIds.push(uploadedImage.ids);
                } catch (error) {
                    console.error(`Error uploading ${fileData.file.name}:`, error);
                    // Cleanup previously uploaded images
                    await cleanupUploadedImages(uploadedIds);
                    throw new Error(`Failed to upload ${fileData.file.name}`);
                }
            }

            toast.dismiss(uploadingToast);
            toast.success(tToast("upload_success") || "Images uploaded successfully!");

            return uploadedImages;
        } catch (error) {
            toast.dismiss(uploadingToast);
            throw error;
        }
    };

    // Helper: Cleanup uploaded images on error
    const cleanupUploadedImages = async (imageIds: string[]) => {
        for (const id of imageIds) {
            try {
                await deleteRegistrationImage(id);
            } catch (cleanupError) {
                console.error("Error cleaning up uploaded image:", cleanupError);
            }
        }
    };

    // Helper: Submit registration with images
    const submitRegistration = (formData: ReturnType<typeof loadAllFormData>, images: UploadedImage[]) => {
        if (!formData) return;

        const payload = {
            ...transformToApiPayload(formData.mergedStudentInfo, formData.familyInfo, formData.educationHealth),
            images: images.length > 0 ? images : undefined,
        };

        console.log("Submitting registration payload:", payload);
        mutation.mutate(payload);
    };

    const submit = async (values: AttachmentsFormValues) => {
        // Load all form data
        const formData = loadAllFormData();
        if (!formData) return;

        try {
            setIsUploading(true);

            // Collect already uploaded images
            const alreadyUploadedImages = collectUploadedImages(values);

            // Collect files that need to be uploaded
            const filesToUpload = collectFilesToUpload(values);

            // If no files to upload, submit directly
            if (filesToUpload.length === 0) {
                if (alreadyUploadedImages.length > 0) {
                    toast.success(tToast("all_images_uploaded") || "All images already uploaded!");
                }
                submitRegistration(formData, alreadyUploadedImages);
                return;
            }

            // Upload new files
            const newlyUploadedImages = await uploadAllFiles(filesToUpload);

            // Combine all images and submit
            const allImages = [...alreadyUploadedImages, ...newlyUploadedImages];
            submitRegistration(formData, allImages);
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error(tToast("upload_error") || "Failed to upload images");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <section className="mx-auto my-8 w-full max-w-[760px]">
            <div className="mb-14 text-center">
                <h3 className="text-lg text-primary md:text-xl" dangerouslySetInnerHTML={{ __html: t.raw("step") }} />
                <h2 className="text-2xl font-bold text-content-natural-secondary md:text-[32px]">{t("title")}</h2>
                <p className="text-natural-tertiary">{t("subtitle")}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormFile
                            className="h-fit"
                            name="parentsId"
                            label={`${t("parentsId")} *`}
                            description={t("parentsIdSubtitle")}
                            hint={t("uploadCard")}
                            accept=".png,.jpg,.jpeg,.pdf"
                            multiple
                        />

                        <FormFile
                            className="h-fit"
                            name="birthCertificate"
                            label={`${t("birthCertificate")} *`}
                            description={t("birthCertificateSubtitle")}
                            hint={t("uploadCard")}
                            accept=".png,.jpg,.jpeg,.pdf"
                        />

                        <FormFile
                            className="h-fit"
                            name="studentPhotos"
                            label={`${t("studentPhotos")} *`}
                            description={t("studentPhotosSubtitle")}
                            hint={t("maxFileSize")}
                            accept=".png,.jpg,.jpeg"
                            multiple
                        />

                        <FormFile
                            className="h-fit"
                            name="familyCard"
                            label={`${t("familyCard")} *`}
                            description={t("familyCardSubtitle")}
                            hint={t("uploadCard")}
                            accept=".png,.jpg,.jpeg,.pdf"
                        />
                    </div>

                    <div className="rounded-[32px] border-s-3 border-primary bg-[#F7FAFF] p-6 md:p-8">
                        <div className="mb-4 flex items-center gap-3 text-content-natural-secondary">
                            <Image width={40} height={40} src={"/images/registration/alert.png"} alt="" className="w-[40px]" />
                            <h3 className="text-lg font-semibold text-black">{t("notes")}</h3>
                        </div>

                        <ul className="list-disc space-y-2 ps-6 text-sm text-[#4C6492] md:text-base">
                            <li>{t("note1")}</li>
                            <li>{t("note2")}</li>
                            <li>
                                {t("note3")}
                                <ul className="mt-2 list-disc space-y-1 ps-6">
                                    <li>{t("stage1")}</li>
                                    <li>{t("stage2")}</li>
                                    <li>{t("stage3")}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <Button type="submit" className="mt-2 w-full rounded-full" size="md" disabled={mutation.isPending || isUploading}>
                        {mutation.isPending || isUploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {isUploading ? "Uploading..." : tToast("submitting")}
                            </>
                        ) : (
                            tCommon("continue")
                        )}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
