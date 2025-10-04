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
import { AttachmentsFormInput, AttachmentsFormValues, getAttachmentsSchema } from "@/validations/attachments.validation";
import { useRegistrationMutation } from "@/hooks/use-registration-mutation";
import { loadData, setData } from "@/lib/local-storage";
import { transformToApiPayload } from "@/lib/registration-mapper";
import { uploadRegistrationImage } from "@/services/registration.service";
import type { StudentInfoFormValues } from "@/validations/student-info.validation";
import type { FamilyInfoFormValues } from "@/validations/family-info.validation";
import type { EducationHealthFormValues } from "@/validations/education-health.validation";
import useTextDirection from "@/hooks/use-text-direction";

export default function AttachmentsPage() {
    const t = useTranslations("register.attachments");
    const tValidations = useTranslations("register.attachments.validation");
    const tCommon = useTranslations("register.studentInformation");
    const tToast = useTranslations("toast");
    const { locale } = useTextDirection();
    const { push } = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<AttachmentsFormInput, undefined, AttachmentsFormValues>({
        resolver: zodResolver(getAttachmentsSchema(tValidations)),
        defaultValues: {},
    });

    const mutation = useRegistrationMutation({
        onSuccess: () => {
            toast.success(tToast("registration_success"));
            push(`/${locale}/registration/thank-you`);
        },
        onError: (error) => {
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

            // Show uploading toast
            const uploadingToast = toast.loading(tToast("uploading_images"));

            // Upload images and get paths
            const imagePaths: string[] = [];

            // Upload all files (validation already normalized them to File[])
            const allFiles = [
                ...values.studentPhotos,
                ...values.parentsId,
                ...values.birthCertificate,
                ...values.familyCard,
            ];

            for (const file of allFiles) {
                const path = await uploadRegistrationImage(file);
                imagePaths.push(path);
            }

            // Dismiss uploading toast and show success
            toast.dismiss(uploadingToast);
            toast.success(tToast("upload_success"));

            // Store uploaded file paths in localStorage
            setData("attachments", { imagePaths });

            // Transform to API payload with image paths
            const payload = {
                ...transformToApiPayload(studentInfo, familyInfo, educationHealth),
                attachments: imagePaths,
            };

            // Submit registration
            mutation.mutate(payload);
        } catch (error) {
            console.error("Error uploading images:", error);
            toast.error(tToast("upload_error"));
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
                            name="parentsId"
                            label={`${t("parentsId")} *`}
                            description={t("parentsIdSubtitle")}
                            hint={t("uploadCard")}
                            accept=".png,.jpg,.jpeg,.pdf"
                        />

                        <FormFile
                            name="birthCertificate"
                            label={`${t("birthCertificate")} *`}
                            description={t("birthCertificateSubtitle")}
                            hint={"uploadCard"}
                            accept=".png,.jpg,.jpeg,.pdf"
                        />

                        <FormFile
                            name="studentPhotos"
                            label={`${t("studentPhotos")} *`}
                            description={t("studentPhotosSubtitle")}
                            hint={"maxFileSize"}
                            accept=".png,.jpg,.jpeg"
                            multiple
                        />

                        <FormFile
                            name="familyCard"
                            label={`${t("familyCard")} *`}
                            description={t("familyCardSubtitle")}
                            hint={t("uploadCard")}
                            accept=".png,.jpg,.jpeg,.pdf"
                        />
                    </div>

                    <div className="rounded-[32px] border border-[#D5DEF1] bg-[#F7FAFF] p-6 md:p-8">
                        <div className="mb-4 flex items-center gap-3 text-content-natural-secondary">
                            <span className="grid size-12 place-items-center rounded-full bg-white shadow-sm">
                                <PaperUploadIcon className="size-6 text-primary" />
                            </span>
                            <h3 className="text-lg font-semibold">{t("notes")}</h3>
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
                                {tToast("submitting")}
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
