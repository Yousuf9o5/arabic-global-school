"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEducationHealthSchema, EducationHealthFormValues } from "@/validations/education-health.validation";
import { useRouter } from "next/navigation";
import useTextDirection from "@/hooks/use-text-direction";
import useFormData from "@/hooks/use-form-data";

export default function EducationHealthPage() {
    const t = useTranslations("register.educationHealth");
    const tValidations = useTranslations("register.educationHealth.validation");

    const { locale } = useTextDirection();
    const { push } = useRouter();

    const form = useForm<EducationHealthFormValues>({
        resolver: zodResolver(getEducationHealthSchema(tValidations)),
        defaultValues: {
            education: {
                previous_school: "",
                school_address: "",
                specialization: "",
                enrollment_year: "",
                graduation_year: "",
            },
            health: {
                medical_history: "",
                mobility: "",
                hearing: "placeholder",
                vision: "placeholder",
                future_ambition: "",
            },
        },
    });

    const { updateFormData } = useFormData<EducationHealthFormValues>({
        key: "education_health",
        onLoad: (val) => form.reset(val),
    });

    const submit = (values: EducationHealthFormValues) => {
        updateFormData(values);
        push(`/${locale}/registration/form/attachments`);
    };

    const visionOptions = [
        { label: t("visionOptions.normal"), value: "normal" },
        { label: t("visionOptions.glasses"), value: "glasses" },
        { label: t("visionOptions.contacts"), value: "contacts" },
        { label: t("visionOptions.low"), value: "low" },
        { label: t("visionOptions.other"), value: "other" },
    ];

    const hearingOptions = [
        { label: t("hearingOptions.normal"), value: "normal" },
        { label: t("hearingOptions.assistive"), value: "assistive" },
        { label: t("hearingOptions.partial"), value: "partial" },
        { label: t("hearingOptions.support"), value: "support" },
        { label: t("hearingOptions.other"), value: "other" },
    ];

    const mobilityOptions = [
        { label: t("mobilityOptions.normal"), value: "normal" },
        { label: t("mobilityOptions.wheelchair"), value: "wheelchair" },
        { label: t("mobilityOptions.crutches"), value: "crutches" },
        { label: t("mobilityOptions.limited"), value: "limited" },
        { label: t("mobilityOptions.other"), value: "other" },
    ];

    return (
        <section className="max-w-[660px] mx-auto my-8">
            <div className="text-center mb-14">
                <h3 className="text-primary text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: t.raw("step") }} />
                <h2 className="text-content-natural-secondary text-2xl md:text-[32px] font-bold">{t("title")}</h2>
                <p className="text-natural-tertiary">{t("subtitle")}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-8">
                    {/* Education Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-content-natural-secondary">{t("educationSection")}</h3>

                        <FormInput name="education.previous_school" label={t("previousSchool")} placeholder={t("previousSchoolPlaceholder")} />

                        <FormInput name="education.school_address" label={t("schoolAddress")} placeholder={t("schoolAddressPlaceholder")} />

                        <FormInput name="education.specialization" label={t("specialization")} placeholder={t("specializationPlaceholder")} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput name="education.enrollment_year" label={t("enrollmentYear")} placeholder={t("enrollmentYearPlaceholder")} />

                            <FormInput name="education.graduation_year" label={t("graduationYear")} placeholder={t("graduationYearPlaceholder")} />
                        </div>
                    </div>

                    {/* Health Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-content-natural-secondary">{t("healthSection")}</h3>

                        <FormInput name="health.medical_history" label={t("medicalHistory")} placeholder={t("medicalHistoryPlaceholder")} />

                        <FormSelect name="health.mobility" label={t("mobility")} placeholder={t("mobilityPlaceholder")} options={mobilityOptions} />

                        <FormInput name="health.future_ambition" label={t("futureAmbition")} placeholder={t("futureAmbitionPlaceholder")} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormSelect name="health.vision" label={t("vision")} placeholder={t("visionPlaceholder")} options={visionOptions} />

                            <FormSelect name="health.hearing" label={t("hearing")} placeholder={t("hearingPlaceholder")} options={hearingOptions} />
                        </div>
                    </div>

                    <Button className="rounded-full w-full mt-4" size="md">
                        {t("continue", { defaultValue: "Continue" })}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
