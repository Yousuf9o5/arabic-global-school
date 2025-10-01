import { z } from "zod";

export function getStudentInfoSchema(t: (key: string) => string) {
    return z.object({
        fullName: z.string().min(2, t("full_name_required")),
        placeOfBirth: z.string().min(2, t("place_of_birth_required")),
        nationalId: z.string().min(6, t("national_id_required")),
        surname: z.string().optional(),
        religion: z.string().optional(),
        dateOfBirth: z.string().min(1, t("date_of_birth_required")),
        ageAsOfJuly: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: t("valid_age_required"),
        }),
        nationalId2: z.string().min(6, t("national_id_required")),
        gender: z.string().min(1, t("gender_required")),
        childPosition: z.string().min(1, t("child_position_required")),
        primaryLanguage: z.string().min(1, t("primary_language_required")),
    });
}

export type StudentInfoFormValues = z.infer<ReturnType<typeof getStudentInfoSchema>>;
