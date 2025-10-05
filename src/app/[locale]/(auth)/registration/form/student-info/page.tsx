"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormDate from "@/components/ui/form-date";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import useFormData from "@/hooks/use-form-data";
import useTextDirection from "@/hooks/use-text-direction";
import { getStudentInfoSchema, StudentInfoFormValues } from "@/validations/student-info.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function StudentInfoPage() {
    const { locale } = useTextDirection();
    const t = useTranslations("register.studentInformation");
    const tValidations = useTranslations("register.studentInformation.validation");
    const { push } = useRouter();

    const form = useForm({
        resolver: zodResolver(getStudentInfoSchema(tValidations)),
        defaultValues: {
            fullName: "",
            placeOfBirth: "",
            nationalId: "",
            surname: "",
            religion: "",
            dateOfBirth: "",
            ageAsOfJuly: "",
            nationalId2: "",
            primaryLanguage: "",
            childPosition: "",
            gender: "",
        },
    });

    const { updateFormData } = useFormData<StudentInfoFormValues>({
        key: "student_info",
        onLoad: (val) => form.reset(val),
    });

    const submit = (data: StudentInfoFormValues) => {
        updateFormData(data);
        push(`/${locale}/registration/form/family-info`);
    };

    return (
        <section className="max-w-[660px] mx-auto my-8">
            <div className="text-center mb-14">
                <h3 className="text-primary text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: t.raw("step") }} />
                <h2 className="text-content-natural-secondary text-2xl md:text-[32px] font-bold">{t("title")}</h2>
                <p className="text-natural-tertiary">{t("subtitle")}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4">
                    <FormInput name="fullName" label={t("fullName")} placeholder={t("placeOfBirthPlaceholder")} />

                    <FormInput name="placeOfBirth" label={t("placeOfBirth")} placeholder={t("placeOfBirthPlaceholder")} />

                    <FormInput name="nationalId" label={t("nationalId")} placeholder={t("nationalIdPlaceholder")} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormInput name="surname" label={t("surname")} placeholder={t("surnamePlaceholder")} />

                        <FormInput name="religion" label={t("religion")} placeholder={t("religionPlaceholder")} />

                        <FormDate name="dateOfBirth" label={t("dateOfBirth")} placeholder={t("dateOfBirthPlaceholder")} />

                        <FormInput name="ageAsOfJuly" label={t("studentAge")} placeholder={t("ageNumber")} type="number" />

                        <FormInput name="nationalId2" label={t("nationalId")} placeholder={t("nationalIdPlaceholder")} />

                        <FormSelect
                            name="gender"
                            label={t("gender")}
                            placeholder={t("genderPlaceholder")}
                            options={[
                                { label: t("genderPlaceholder"), value: "none" },
                                { label: t("male", { defaultValue: "Male" }), value: "male" },
                                { label: t("female", { defaultValue: "Female" }), value: "female" },
                            ]}
                        />

                        <FormSelect
                            name="childPosition"
                            label={t("siblingPosition")}
                            placeholder={t("siblingPlaceholder")}
                            options={[
                                { label: t("siblingPlaceholder"), value: "none" },
                                { label: t("first", { defaultValue: "First" }), value: "first" },
                                { label: t("second", { defaultValue: "Second" }), value: "second" },
                                { label: t("third", { defaultValue: "Third" }), value: "third" },
                                { label: t("fourth", { defaultValue: "Fourth" }), value: "fourth" },
                                { label: t("fifth", { defaultValue: "Fifth" }), value: "fifth" },
                                { label: t("other", { defaultValue: "Other" }), value: "other" },
                            ]}
                        />

                        <FormSelect
                            name="primaryLanguage"
                            label={t("primaryLanguage")}
                            placeholder={t("languagePlaceholder")}
                            options={[
                                { label: t("languagePlaceholder"), value: "none" },
                                { label: t("arabic", { defaultValue: "Arabic" }), value: "arabic" },
                                { label: t("english", { defaultValue: "English" }), value: "english" },
                                { label: t("indonesian", { defaultValue: "Indonesian" }), value: "indonesian" },
                                { label: t("other", { defaultValue: "Other" }), value: "other" },
                            ]}
                        />
                    </div>

                    <Button className="rounded-full w-full mt-4" size={"md"}>
                        {t("continue")}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
