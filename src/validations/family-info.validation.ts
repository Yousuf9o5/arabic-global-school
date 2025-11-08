import { z } from "zod";

/**
 * Validation schema for parent information matching API structure.
 * Creates separate objects for mother and father data.
 * Only required field: full_name (either mother or father)
 */
const parentSchema = (t: (key: string) => string, parentType: "mother" | "father") =>
    z.object({
        full_name: z.string().min(2, t(`${parentType}_name_required`)),
        birthday: z.string().optional(),
        age: z.string().optional(),
        religion: z.string().optional(),
        birth_place: z.string().optional(),
        nationality: z.string().optional(),
        registration_role: z.string().optional(),
        specialization: z.string().optional(),
        last_education: z.string().optional(),
        job_title: z.string().optional(),
        job_type: z.string().optional(),
        employer: z.string().optional(),
        employer_address: z.string().optional(),
        office_phone: z.string().optional(),
        monthly_income: z.enum(["0", "1", "2", "3"], { message: t("monthly_income_required") }).optional(),
        email: z.string().email(t("valid_email_required")).optional().or(z.literal("")),
        phone: z.string().optional(),
        emergency_phone: z.string().optional(),
        contact_time: z.enum(["0", "1", "2"], { message: t("contact_time_required") }).optional(),
    });

export function getFamilyInfoSchema(t: (key: string) => string) {
    return z.object({
        mother: parentSchema(t, "mother"),
        father: parentSchema(t, "father"),
    });
}

export type FamilyInfoFormValues = z.infer<ReturnType<typeof getFamilyInfoSchema>>;
