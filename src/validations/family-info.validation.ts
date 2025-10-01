import { z } from "zod";

/**
 * Returns the Zod schema for the family information form, using the provided translation function for error messages.
 * @param t - Translation function for validation messages
 */
export function getFamilyInfoSchema(t: (key: string) => string) {
    return z.object({
        fatherName: z.string().min(2, t("father_name_required")),
        motherName: z.string().min(2, t("mother_name_required")),
        nationalIdNumber: z.string().min(6, t("national_id_required")),
        monthlyIncome: z.string().optional(),
        phoneNumber: z.string().min(6, t("phone_number_required")),
        emailAddress: z.string().email(t("valid_email_required")),
        guardianName: z.string().optional(),
        guardianRelationship: z.string().optional(),
        parentAge: z.string().optional(),
        occupation: z.string().optional(),
        workPlace: z.string().optional(),
        officeAddress: z.string().optional(),
        landlinePhone: z.string().optional(),
    });
}

export type FamilyInfoFormValues = z.infer<ReturnType<typeof getFamilyInfoSchema>>;
