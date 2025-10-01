import { z } from "zod";

/**
 * Returns the Zod schema for the education and health form, leveraging localized validation messages.
 * @param t - Translation function for validation keys.
 */
export function getEducationHealthSchema(t: (key: string) => string) {
    return z.object({
        previousSchool: z.string().min(2, t("previous_school_required")),
        schoolAddress: z.string().min(2, t("school_address_required")),
        fieldOfStudy: z.string().optional(),
        enrollmentYear: z
            .string()
            .regex(/^\d{4}$/u, t("enrollment_year_required")),
        graduationYear: z
            .string()
            .regex(/^\d{4}$/u, t("graduation_year_required")),
        medicalHistory: z.string().optional(),
        futureAspiration: z.string().refine((value) => value !== "placeholder" && value.trim().length > 0, {
            message: t("future_aspiration_required"),
        }),
        vision: z.string().refine((value) => value !== "placeholder" && value.trim().length > 0, {
            message: t("vision_required"),
        }),
        hearing: z.string().refine((value) => value !== "placeholder" && value.trim().length > 0, {
            message: t("hearing_required"),
        }),
    });
}

export type EducationHealthFormValues = z.infer<ReturnType<typeof getEducationHealthSchema>>;
