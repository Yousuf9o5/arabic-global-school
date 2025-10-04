"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

// Minimal Zod schema for family info (expand as needed)
import { FamilyInfoFormValues, getFamilyInfoSchema } from "@/validations/family-info.validation";
import { useRouter } from "next/navigation";
import useTextDirection from "@/hooks/use-text-direction";
import { useEffect } from "react";
import { loadData, setData } from "@/lib/local-storage";

export default function FamilyInfoPage() {
    const t = useTranslations("register.familyInformation");
    const tValidations = useTranslations("register.familyInformation.validation");
    const tCommon = useTranslations("register.studentInformation");

    const { locale } = useTextDirection();
    const { push } = useRouter();

    const form = useForm<FamilyInfoFormValues>({
        resolver: zodResolver(getFamilyInfoSchema(tValidations)),
        defaultValues: {
            fatherName: "",
            motherName: "",
            nationalIdNumber: "",
            monthlyIncome: "",
            phoneNumber: "",
            emailAddress: "",
            guardianName: "",
            guardianRelationship: "",
            parentAge: "",
            occupation: "",
            workPlace: "",
            officeAddress: "",
            landlinePhone: "",
        },
    });

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = loadData<FamilyInfoFormValues>("family_info");
        if (savedData) {
            form.reset(savedData);
        }
    }, [form]);

    const submit = (data: FamilyInfoFormValues) => {
        setData("family_info", data);
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
                <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormInput name="fatherName" label={t("fatherName")} placeholder={t("fatherNamePlaceholder")} />
                        <FormInput name="motherName" label={t("motherName")} placeholder={t("motherNamePlaceholder")} />

                        <FormInput name="nationalIdNumber" label={t("nationalIdNumber")} placeholder={t("nationalIdPlaceholder")} />
                        <FormInput name="monthlyIncome" label={t("monthlyIncome")} placeholder={t("monthlyIncomePlaceholder")} />

                        <FormInput name="phoneNumber" label={t("phoneNumber")} placeholder={t("phoneNumberPlaceholder")} />
                        <FormInput name="emailAddress" label={t("emailAddress")} placeholder={t("emailPlaceholder")} />

                        <FormInput name="guardianName" label={t("guardianName")} placeholder={t("guardianNamePlaceholder")} />
                        <FormInput name="guardianRelationship" label={t("guardianRelationship")} placeholder={t("guardianRelationshipPlaceholder")} />

                        <FormInput name="parentAge" label={t("parentAge")} placeholder={t("parentAgePlaceholder")} />
                        <FormInput name="occupation" label={t("occupation")} placeholder={t("occupationPlaceholder")} />

                        <FormInput name="workPlace" label={t("workPlace")} placeholder={t("workPlacePlaceholder")} />
                        <FormInput name="officeAddress" label={t("officeAddress")} placeholder={t("officeAddressPlaceholder")} />

                        <FormInput
                            name="landlinePhone"
                            label={t("landlinePhone")}
                            placeholder={t("landlinePhonePlaceholder")}
                            className="md:col-span-2"
                        />
                    </div>

                    <Button className="rounded-full w-full mt-4" size={"md"}>
                        {tCommon("continue")}
                    </Button>
                </form>
            </Form>
        </section>
    );
}
