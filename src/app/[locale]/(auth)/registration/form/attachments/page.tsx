"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { PaperUploadIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import FormFile from "@/components/ui/form-file";
import { Form } from "@/components/ui/form";
import { AttachmentsFormInput, AttachmentsFormValues, getAttachmentsSchema } from "@/validations/attachments.validation";

export default function AttachmentsPage() {
    const t = useTranslations("register.attachments");
    const tValidations = useTranslations("register.attachments.validation");
    const tCommon = useTranslations("register.studentInformation");

    const form = useForm<AttachmentsFormInput, undefined, AttachmentsFormValues>({
        resolver: zodResolver(getAttachmentsSchema(tValidations)),
        defaultValues: {},
    });

    const submit = (values: AttachmentsFormValues) => {
        console.log(values);
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

                    <Button type="submit" className="mt-2 w-full rounded-full" size="md">
                        {tCommon("continue")}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
