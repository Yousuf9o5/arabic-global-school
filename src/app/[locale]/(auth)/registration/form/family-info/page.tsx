"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import FormDate from "@/components/ui/form-date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import useFormData from "@/hooks/use-form-data";
import useTextDirection from "@/hooks/use-text-direction";
import { FamilyInfoFormValues, getFamilyInfoSchema } from "@/validations/family-info.validation";
import { useRouter } from "next/navigation";

export default function FamilyInfoPage() {
    const t = useTranslations("register.familyInformation");
    const tValidations = useTranslations("register.familyInformation.validation");
    const tCommon = useTranslations("register.studentInformation");

    const { locale } = useTextDirection();
    const { push } = useRouter();

    const form = useForm<FamilyInfoFormValues>({
        resolver: zodResolver(getFamilyInfoSchema(tValidations)),
        defaultValues: {
            mother: {
                full_name: "",
                birthday: "",
                age: "",
                religion: "",
                birth_place: "",
                nationality: "",
                registration_role: "",
                specialization: "",
                last_education: "",
                job_title: "",
                job_type: "",
                employer: "",
                employer_address: "",
                office_phone: "",
                monthly_income: "",
                email: "",
                phone: "",
                emergency_phone: "",
                contact_time: "",
            },
            father: {
                full_name: "",
                birthday: "",
                age: "",
                religion: "",
                birth_place: "",
                nationality: "",
                registration_role: "",
                specialization: "",
                last_education: "",
                job_title: "",
                job_type: "",
                employer: "",
                employer_address: "",
                office_phone: "",
                monthly_income: "",
                email: "",
                phone: "",
                emergency_phone: "",
                contact_time: "",
            },
        },
    });

    const { updateFormData } = useFormData<FamilyInfoFormValues>({
        key: "family_info",
        onLoad: (val) => form.reset(val),
    });

    const submit = (data: FamilyInfoFormValues) => {
        updateFormData(data);
        push(`/${locale}/registration/form/education-health`);
    };

    return (
        <section className="max-w-[660px] mx-auto my-8">
            <div className="text-center mb-14">
                <h3 className="text-primary text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: t.raw("step") }} />
                <h2 className="text-content-natural-secondary text-2xl md:text-[32px] font-bold">{t("title")}</h2>
                <p className="text-natural-tertiary">{t("subtitle")}</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-8">
                    {/* Mother Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-content-natural-secondary">{t("motherSection")}</h3>
                        
                        <FormInput
                            name="mother.full_name"
                            label={t("motherFullName")}
                            placeholder={t("motherFullNamePlaceholder")}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormDate name="mother.birthday" label={t("motherBirthday")} placeholder={t("birthdayPlaceholder")} />
                            
                            <FormInput
                                name="mother.age"
                                label={t("motherAge")}
                                placeholder={t("agePlaceholder")}
                                type="number"
                            />

                            <FormInput name="mother.religion" label={t("motherReligion")} placeholder={t("religionPlaceholder")} />

                            <FormInput
                                name="mother.birth_place"
                                label={t("motherBirthPlace")}
                                placeholder={t("birthPlacePlaceholder")}
                            />

                            <FormInput
                                name="mother.nationality"
                                label={t("motherNationality")}
                                placeholder={t("nationalityPlaceholder")}
                            />

                            <FormInput
                                name="mother.registration_role"
                                label={t("motherRegistrationRole")}
                                placeholder={t("registrationRolePlaceholder")}
                            />

                            <FormInput
                                name="mother.specialization"
                                label={t("motherSpecialization")}
                                placeholder={t("specializationPlaceholder")}
                            />

                            <FormInput
                                name="mother.last_education"
                                label={t("motherLastEducation")}
                                placeholder={t("lastEducationPlaceholder")}
                            />

                            <FormInput name="mother.job_title" label={t("motherJobTitle")} placeholder={t("jobTitlePlaceholder")} />

                            <FormInput name="mother.job_type" label={t("motherJobType")} placeholder={t("jobTypePlaceholder")} />

                            <FormInput name="mother.employer" label={t("motherEmployer")} placeholder={t("employerPlaceholder")} />

                            <FormInput
                                name="mother.employer_address"
                                label={t("motherEmployerAddress")}
                                placeholder={t("employerAddressPlaceholder")}
                            />

                            <FormInput
                                name="mother.office_phone"
                                label={t("motherOfficePhone")}
                                placeholder={t("officePhonePlaceholder")}
                            />

                            <FormInput
                                name="mother.monthly_income"
                                label={t("motherMonthlyIncome")}
                                placeholder={t("monthlyIncomePlaceholder")}
                                type="number"
                            />

                            <FormInput name="mother.email" label={t("motherEmail")} placeholder={t("emailPlaceholder")} type="email" />

                            <FormInput name="mother.phone" label={t("motherPhone")} placeholder={t("phonePlaceholder")} />

                            <FormInput
                                name="mother.emergency_phone"
                                label={t("motherEmergencyPhone")}
                                placeholder={t("emergencyPhonePlaceholder")}
                            />

                            <FormInput
                                name="mother.contact_time"
                                label={t("motherContactTime")}
                                placeholder={t("contactTimePlaceholder")}
                            />
                        </div>
                    </div>

                    {/* Father Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-content-natural-secondary">{t("fatherSection")}</h3>
                        
                        <FormInput
                            name="father.full_name"
                            label={t("fatherFullName")}
                            placeholder={t("fatherFullNamePlaceholder")}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormDate name="father.birthday" label={t("fatherBirthday")} placeholder={t("birthdayPlaceholder")} />
                            
                            <FormInput
                                name="father.age"
                                label={t("fatherAge")}
                                placeholder={t("agePlaceholder")}
                                type="number"
                            />

                            <FormInput name="father.religion" label={t("fatherReligion")} placeholder={t("religionPlaceholder")} />

                            <FormInput
                                name="father.birth_place"
                                label={t("fatherBirthPlace")}
                                placeholder={t("birthPlacePlaceholder")}
                            />

                            <FormInput
                                name="father.nationality"
                                label={t("fatherNationality")}
                                placeholder={t("nationalityPlaceholder")}
                            />

                            <FormInput
                                name="father.registration_role"
                                label={t("fatherRegistrationRole")}
                                placeholder={t("registrationRolePlaceholder")}
                            />

                            <FormInput
                                name="father.specialization"
                                label={t("fatherSpecialization")}
                                placeholder={t("specializationPlaceholder")}
                            />

                            <FormInput
                                name="father.last_education"
                                label={t("fatherLastEducation")}
                                placeholder={t("lastEducationPlaceholder")}
                            />

                            <FormInput name="father.job_title" label={t("fatherJobTitle")} placeholder={t("jobTitlePlaceholder")} />

                            <FormInput name="father.job_type" label={t("fatherJobType")} placeholder={t("jobTypePlaceholder")} />

                            <FormInput name="father.employer" label={t("fatherEmployer")} placeholder={t("employerPlaceholder")} />

                            <FormInput
                                name="father.employer_address"
                                label={t("fatherEmployerAddress")}
                                placeholder={t("employerAddressPlaceholder")}
                            />

                            <FormInput
                                name="father.office_phone"
                                label={t("fatherOfficePhone")}
                                placeholder={t("officePhonePlaceholder")}
                            />

                            <FormInput
                                name="father.monthly_income"
                                label={t("fatherMonthlyIncome")}
                                placeholder={t("monthlyIncomePlaceholder")}
                                type="number"
                            />

                            <FormInput name="father.email" label={t("fatherEmail")} placeholder={t("emailPlaceholder")} type="email" />

                            <FormInput name="father.phone" label={t("fatherPhone")} placeholder={t("phonePlaceholder")} />

                            <FormInput
                                name="father.emergency_phone"
                                label={t("fatherEmergencyPhone")}
                                placeholder={t("emergencyPhonePlaceholder")}
                            />

                            <FormInput
                                name="father.contact_time"
                                label={t("fatherContactTime")}
                                placeholder={t("contactTimePlaceholder")}
                            />
                        </div>
                    </div>

                    <Button className="rounded-full w-full mt-4" size={"md"}>
                        {tCommon("continue")}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
