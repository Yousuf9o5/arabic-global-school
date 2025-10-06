"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormDate from "@/components/ui/form-date";
import { FormInput } from "@/components/ui/form-input";
import { FormSelect } from "@/components/ui/form-select";
import useFormData from "@/hooks/use-form-data";
import useTextDirection from "@/hooks/use-text-direction";
import type { StudentInfoFormValues } from "@/validations/student-info.validation";
import { getStudentInfoSchema } from "@/validations/student-info.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function StudentInfoPage() {
    const { locale } = useTextDirection();
    const t = useTranslations("register.studentInformation");
    const tValidations = useTranslations("register.studentInformation.validation");
    const { push } = useRouter();

    const form = useForm<StudentInfoFormValues>({
        resolver: zodResolver(getStudentInfoSchema(tValidations)),
        defaultValues: {
            child_school: "",
            child_next_class: "",
            full_name: "",
            birth_place: "",
            family_name: "",
            religion: "",
            birthday: "",
            age_in_july: "",
            id_passport_number: "",
            gender: "",
            nationality: "",
            weight_height: "",
            sibling_order: "",
            home_language: "",
            living_with: "",
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
                    <FormSelect
                        name="child_school"
                        label={t("childSchool")}
                        placeholder={t("childSchoolPlaceholder")}
                        options={[
                            { label: t("primarySchool"), value: "0" },
                            { label: t("middleSchool"), value: "1" },
                            { label: t("highSchool"), value: "2" },
                        ]}
                    />

                    <FormInput
                        name="child_next_class"
                        label={t("childNextClass")}
                        placeholder={t("childNextClassPlaceholder")}
                    />

                    <FormInput name="full_name" label={t("fullName")} placeholder={t("fullNamePlaceholder")} />

                    <FormInput name="birth_place" label={t("birthPlace")} placeholder={t("birthPlacePlaceholder")} />

                    <FormInput name="family_name" label={t("familyName")} placeholder={t("familyNamePlaceholder")} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormInput name="religion" label={t("religion")} placeholder={t("religionPlaceholder")} />

                        <FormDate name="birthday" label={t("birthday")} placeholder={t("birthdayPlaceholder")} />

                        <FormInput
                            name="age_in_july"
                            label={t("ageInJuly")}
                            placeholder={t("ageInJulyPlaceholder")}
                            type="number"
                        />

                        <FormInput
                            name="id_passport_number"
                            label={t("idPassportNumber")}
                            placeholder={t("idPassportNumberPlaceholder")}
                            type="number"
                        />

                        <FormSelect
                            name="gender"
                            label={t("gender")}
                            placeholder={t("genderPlaceholder")}
                            options={[
                                { label: t("male"), value: "true" },
                                { label: t("female"), value: "false" },
                            ]}
                        />

                        <FormInput name="nationality" label={t("nationality")} placeholder={t("nationalityPlaceholder")} />

                        <FormInput
                            name="weight_height"
                            label={t("weightHeight")}
                            placeholder={t("weightHeightPlaceholder")}
                        />

                        <FormInput
                            name="sibling_order"
                            label={t("siblingOrder")}
                            placeholder={t("siblingOrderPlaceholder")}
                            type="number"
                        />

                        <FormInput
                            name="home_language"
                            label={t("homeLanguage")}
                            placeholder={t("homeLanguagePlaceholder")}
                        />

                        <FormInput name="living_with" label={t("livingWith")} placeholder={t("livingWithPlaceholder")} />
                    </div>

                    <Button className="rounded-full w-full mt-4" size={"md"}>
                        {t("continue")}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
