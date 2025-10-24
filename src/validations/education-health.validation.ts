import { z } from "zod";

/**
 * Validation schema for education and health matching API structure.
 * Split into separate "education" and "health" objects.
 */
export function getEducationHealthSchema(t: (key: string) => string) {
    return z.object({
        education: z.object({
            previous_school: z.string().min(2, t("previous_school_required")),
            school_address: z.string().min(2, t("school_address_required")),
            specialization: z.string().optional(),
            enrollment_year: z.string().regex(/^\d{4}$/u, t("enrollment_year_required")),
            graduation_year: z.string().regex(/^\d{4}$/u, t("graduation_year_required")),
        }),
        health: z.object({
            medical_history: z.string().optional(),
            mobility: z.enum(["0", "1"], { message: t("mobility_required") }).optional(),
            hearing: z.enum(["0", "1"], { message: t("hearing_required") }),
            vision: z.enum(["0", "1"], { message: t("vision_required") }),
            future_ambition: z.string().optional(),
        }),
    });
}

export type EducationHealthFormValues = z.infer<ReturnType<typeof getEducationHealthSchema>>;
