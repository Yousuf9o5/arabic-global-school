import { z } from "zod";

/**
 * Validation schema for education and health matching API structure.
 * Split into separate "education" and "health" objects.
 * enrollment_year and graduation_year must be exactly 4 digits
 */
export function getEducationHealthSchema(t: (key: string) => string) {
    return z.object({
        education: z.object({
            previous_school: z.string().optional(),
            school_address: z.string().optional(),
            specialization: z.string().optional(),
            enrollment_year: z.string().regex(/^\d{4}$/, t("enrollment_year_required")).optional(),
            graduation_year: z.string().regex(/^\d{4}$/, t("graduation_year_required")).optional(),
        }),
        health: z.object({
            medical_history: z.string().optional(),
            mobility: z.enum(["0", "1"], { message: t("mobility_required") }).optional(),
            hearing: z.enum(["0", "1"], { message: t("hearing_required") }).optional(),
            vision: z.enum(["0", "1"], { message: t("vision_required") }).optional(),
            future_ambition: z.string().optional(),
        }),
    });
}

export type EducationHealthFormValues = z.infer<ReturnType<typeof getEducationHealthSchema>>;
