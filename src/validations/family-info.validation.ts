import { z } from "zod";

/**
 * Validation schema for parent information matching API structure.
 * Creates separate objects for mother and father data.
 */
const parentSchema = (t: (key: string) => string, parentType: "mother" | "father") =>
    z.object({
        full_name: z.string().min(2, t(`${parentType}_name_required`)),
        birthday: z.string().min(1, t("birthday_required")),
        age: z.string().min(1, t("age_required")),
        religion: z.string().optional(),
        birth_place: z.string().min(2, t("birth_place_required")),
        nationality: z.string().min(2, t("nationality_required")),
        registration_role: z.string().min(2, t("registration_role_required")),
        specialization: z.string().optional(),
        last_education: z.string().optional(),
        job_title: z.string().optional(),
        job_type: z.string().optional(),
        employer: z.string().optional(),
        employer_address: z.string().optional(),
        office_phone: z.string().optional(),
        monthly_income: z.string().optional(),
        email: z.string().email(t("valid_email_required")),
        phone: z.string().min(6, t("phone_number_required")),
        emergency_phone: z.string().optional(),
        contact_time: z.string().optional(),
    });

export function getFamilyInfoSchema(t: (key: string) => string) {
    return z.object({
        mother: parentSchema(t, "mother"),
        father: parentSchema(t, "father"),
    });
}

export type FamilyInfoFormValues = z.infer<ReturnType<typeof getFamilyInfoSchema>>;
