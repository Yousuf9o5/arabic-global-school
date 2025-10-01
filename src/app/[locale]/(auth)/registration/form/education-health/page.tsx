"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getEducationHealthSchema, EducationHealthFormValues } from "@/validations/education-health.validation";

export default function EducationHealthPage() {
  const t = useTranslations("register.educationHealth");
  const tValidations = useTranslations("register.educationHealth.validation");

  const form = useForm<EducationHealthFormValues>({
    resolver: zodResolver(getEducationHealthSchema(tValidations)),
    defaultValues: {
      previousSchool: "",
      schoolAddress: "",
      fieldOfStudy: "",
      enrollmentYear: "",
      graduationYear: "",
      medicalHistory: "",
            futureAspiration: "placeholder",
            vision: "placeholder",
            hearing: "placeholder",
    },
  });

  const submit = (values: EducationHealthFormValues) => {
    console.log(values);
  };

  const futureAspirationOptions = [
    { label: t("futureAspirationPlaceholder"), value: "placeholder" },
    { label: t("futureAspirationOptions.doctor"), value: "doctor" },
    { label: t("futureAspirationOptions.engineer"), value: "engineer" },
    { label: t("futureAspirationOptions.scientist"), value: "scientist" },
    { label: t("futureAspirationOptions.teacher"), value: "teacher" },
    { label: t("futureAspirationOptions.entrepreneur"), value: "entrepreneur" },
    { label: t("futureAspirationOptions.artist"), value: "artist" },
    { label: t("futureAspirationOptions.other"), value: "other" },
  ];

  const visionOptions = [
    { label: t("visionPlaceholder"), value: "placeholder" },
    { label: t("visionOptions.normal"), value: "normal" },
    { label: t("visionOptions.glasses"), value: "glasses" },
    { label: t("visionOptions.contacts"), value: "contacts" },
    { label: t("visionOptions.low"), value: "low" },
    { label: t("visionOptions.other"), value: "other" },
  ];

  const hearingOptions = [
    { label: t("hearingPlaceholder"), value: "placeholder" },
    { label: t("hearingOptions.normal"), value: "normal" },
    { label: t("hearingOptions.assistive"), value: "assistive" },
    { label: t("hearingOptions.partial"), value: "partial" },
    { label: t("hearingOptions.support"), value: "support" },
    { label: t("hearingOptions.other"), value: "other" },
  ];

  return (
    <section className="max-w-[660px] mx-auto my-8">
      <div className="text-center mb-14">
        <h3 className="text-primary text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: t.raw("step") }} />
        <h2 className="text-content-natural-secondary text-2xl md:text-[32px] font-bold">{t("title")}</h2>
        <p className="text-natural-tertiary">{t("subtitle")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-6">
          <FormInput
            name="previousSchool"
            label={t("previousSchool")}
            placeholder={t("previousSchoolPlaceholder")}
          />

          <FormInput
            name="schoolAddress"
            label={t("schoolAddress")}
            placeholder={t("schoolAddressPlaceholder")}
          />

          <FormInput
            name="fieldOfStudy"
            label={t("fieldOfStudy")}
            placeholder={t("fieldOfStudyPlaceholder")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormInput
              name="enrollmentYear"
              label={t("enrollmentYear")}
              placeholder={t("enrollmentYearPlaceholder")}
            />

            <FormInput
              name="graduationYear"
              label={t("graduationYear")}
              placeholder={t("graduationYearPlaceholder")}
            />
          </div>

          <FormInput
            name="medicalHistory"
            label={t("medicalHistory")}
            placeholder={t("medicalHistoryPlaceholder")}
          />

          <FormSelect
            name="futureAspiration"
            label={t("futureAspiration")}
            placeholder={t("futureAspirationPlaceholder")}
            options={futureAspirationOptions}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormSelect
              name="vision"
              label={t("vision")}
              placeholder={t("visionPlaceholder")}
              options={visionOptions}
            />

            <FormSelect
              name="hearing"
              label={t("hearing")}
              placeholder={t("hearingPlaceholder")}
              options={hearingOptions}
            />
          </div>

          <Button className="rounded-full w-full mt-4" size="md">
            {t("continue")}
          </Button>
        </form>
      </Form>
    </section>
  );
}
