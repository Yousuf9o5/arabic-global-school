"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PaperUploadIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import FormFile from "@/components/ui/form-file";
import { Form } from "@/components/ui/form";
import { AttachmentsFormValues, getAttachmentsSchema, UploadedFile } from "@/validations/attachments.validation";
import { useRegistrationMutation } from "@/hooks/use-registration-mutation";
import { loadData } from "@/lib/local-storage";
import { transformToApiPayload } from "@/lib/registration-mapper";
import { uploadRegistrationImage, deleteRegistrationImage } from "@/services/registration.service";
import type { StudentInfoFormValues } from "@/validations/student-info.validation";
import type { FamilyInfoFormValues } from "@/validations/family-info.validation";
import type { EducationHealthFormValues } from "@/validations/education-health.validation";
import useTextDirection from "@/hooks/use-text-direction";
import Image from "next/image";

// Map field names to image types (0-3)
const IMAGE_TYPE_MAP: Record<string, string> = {
    studentPhotos: "0", // student_photo
    birthCertificate: "1", // birth_certificate
    familyCard: "2", // family_card
    parentsId: "3", // parents_id
};

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
            // Clear localStorage
            localStorage.removeItem("student_info");
            localStorage.removeItem("family_info");
            localStorage.removeItem("education_health");
            push(`/${locale}/registration/thank-you`);
        },
        onError: () => {
            toast.error(tToast("registration_error"));
        },
    });

    const submit = async (values: AttachmentsFormValues) => {
        // Load all form data from localStorage
        const studentInfo = loadData<StudentInfoFormValues>("student_info");
        const familyInfo = loadData<FamilyInfoFormValues>("family_info");
        const educationHealth = loadData<EducationHealthFormValues>("education_health");

        if (!studentInfo || !familyInfo || !educationHealth) {
            toast.warning(tToast("complete_steps"));
            return;
        }

        try {
            setIsUploading(true);

            // Collect all files with their types
            const allFiles: Array<{ file: File; type: string; fieldName: string; uploadedFile: UploadedFile }> = [];

            Object.entries(values).forEach(([fieldName, uploadedFiles]) => {
                const imageType = IMAGE_TYPE_MAP[fieldName] || "0";
                uploadedFiles.forEach((uploaded) => {
                    // Only include files that haven't been uploaded yet
                    if (!uploaded.uploaded) {
                        allFiles.push({
                            file: uploaded.file,
                            type: imageType,
                            fieldName,
                            uploadedFile: uploaded,
                        });
                    }
                });
            });

            // Collect already uploaded images
            const alreadyUploadedImages: Array<{ ids: string; path: string; type: string }> = [];
            Object.entries(values).forEach(([fieldName, uploadedFiles]) => {
                const imageType = IMAGE_TYPE_MAP[fieldName] || "0";
                uploadedFiles.forEach((uploaded) => {
                    if (uploaded.uploaded && uploaded.uploadedId && uploaded.path) {
                        alreadyUploadedImages.push({
                            ids: uploaded.uploadedId,
                            path: uploaded.path,
                            type: imageType,
                        });
                    }
                });
            });

            // If all files are already uploaded, skip upload step
            if (allFiles.length === 0) {
                toast.success(tToast("all_images_uploaded") || "All images already uploaded!");

                // Transform to API payload with already uploaded images
                const payload = {
                    ...transformToApiPayload(studentInfo, familyInfo, educationHealth),
                    images: alreadyUploadedImages,
                };

                console.log("Submitting registration payload with existing images:", payload);

                // Submit registration
                mutation.mutate(payload);
                return;
            }

            // Show uploading toast only if there are new files to upload
            const uploadingToast = toast.loading(
                `${tToast("uploading_images") || "Uploading images"} (${allFiles.length} ${tToast("files") || "files"})...`
            );

            // Upload images and collect their data
            const uploadedImages: Array<{ ids: string; path: string; type: string }> = [];
            const uploadedIds: string[] = [];

            for (let i = 0; i < allFiles.length; i++) {
                const { file, type, fieldName, uploadedFile } = allFiles[i];

                try {
                    const uploadResponse = await uploadRegistrationImage(file, type);
                    uploadedImages.push({
                        ids: uploadResponse.id,
                        path: uploadResponse.path,
                        type: uploadResponse.type,
                    });
                    uploadedIds.push(uploadResponse.id);

                    // Update the form field to mark as uploaded
                    const currentFieldValue = form.getValues(fieldName as keyof AttachmentsFormValues);
                    const updatedFiles = (currentFieldValue as UploadedFile[]).map((uf) =>
                        uf.id === uploadedFile.id
                            ? {
                                  ...uf,
                                  path: uploadResponse.path,
                                  uploaded: true,
                                  uploadedId: uploadResponse.id,
                              }
                            : uf
                    );
                    form.setValue(fieldName as keyof AttachmentsFormValues, updatedFiles as any);
                } catch (error) {
                    console.error(`Error uploading ${file.name}:`, error);
                    // Cleanup previously uploaded images
                    for (const id of uploadedIds) {
                        try {
                            await deleteRegistrationImage(id);
                        } catch (cleanupError) {
                            console.error("Error cleaning up uploaded image:", cleanupError);
                        }
                    }
                    throw new Error(`Failed to upload ${file.name}`);
                }
            }

            // Dismiss uploading toast and show success
            toast.dismiss(uploadingToast);
            toast.success(tToast("upload_success") || "Images uploaded successfully!");

            // Combine newly uploaded images with already uploaded ones
            const allUploadedImages = [...alreadyUploadedImages, ...uploadedImages];

            // Transform to API payload with image paths
            const payload = {
                ...transformToApiPayload(studentInfo, familyInfo, educationHealth),
                images: allUploadedImages,
            };

            console.log("Submitting registration payload:", payload);

            // Submit registration
            mutation.mutate(payload);
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
