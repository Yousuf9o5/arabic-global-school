import { z } from "zod";

export function getStudentClassInfo(t: (key: string) => string) {
    return z.object({
        child_school: z.string().min(2, t("")),
        child_next_class: z.string().min(2, t("")),
    });
}

export type StudentClassInfo = z.infer<ReturnType<typeof getStudentClassInfo>>;

export function getStudentInfoSchema(t: (key: string) => string) {
    return z.object({
        child_school: z.number().min(1, t("school_required")),
        child_next_class: z.string().min(2, t("next_class_required")),
        full_name: z.string().min(2, t("full_name_required")),
        birth_place: z.string().min(2, t("place_of_birth_required")),
        family_name: z.string().min(2, t("family_name_required")),
        religion: z.string().optional(),
        birthday: z.string().min(1, t("date_of_birth_required")),
        age_in_july: z.number().min(1, t("valid_age_required")),
        id_passport_number: z.number().min(1, t("id_passport_required")),
        gender: z.string().min(1, t("gender_required")),
        nationality: z.string().min(2, t("nationality_required")),
        weight_height: z.string().min(2, t("weight_height_required")),
        sibling_order: z.number().min(1, t("sibling_order_required")),
        home_language: z.string().min(2, t("primary_language_required")),
        living_with: z.string().min(2, t("living_with_required")),
    });
}

export type StudentInfoFormValues = z.infer<ReturnType<typeof getStudentInfoSchema>>;
