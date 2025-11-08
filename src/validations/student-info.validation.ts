import { z } from "zod";

export function getStudentClassInfo(t: (key: string) => string) {
    return z.object({
        child_school: z.string().optional(),
        child_next_class: z.string().min(2, t("next_class_required")),
    });
}

export type StudentClassInfo = z.infer<ReturnType<typeof getStudentClassInfo>>;

/**
 * Validation schema for student information matching API structure.
 * All fields use string validation, transformation to API types happens in mapper.
 * Required fields: full_name, birthday
 */
export function getStudentInfoSchema(t: (key: string) => string) {
    return z.object({
        full_name: z.string().min(2, t("full_name_required")),
        birth_place: z.string().optional(),
        family_name: z.string().optional(),
        religion: z.string().optional(),
        birthday: z.string().min(1, t("date_of_birth_required")),
        age_in_july: z.string().optional(),
        id_passport_number: z.string().optional(),
        gender: z.union([z.enum(["0", "1"]), z.string().optional()]),
        nationality: z.union([z.enum(["0", "1"]), z.string().optional()]),
        weight_height: z.string().optional(),
        sibling_order: z.string().optional(),
        home_language: z.string().optional(),
        living_with: z.union([z.enum(["0", "1"]), z.string().optional()]).optional(),
    });
}

export type StudentInfoFormValues = z.infer<ReturnType<typeof getStudentInfoSchema>>;
