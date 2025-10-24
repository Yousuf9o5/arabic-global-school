import type { StudentInfoFormValues } from "@/validations/student-info.validation";
import type { FamilyInfoFormValues } from "@/validations/family-info.validation";
import type { EducationHealthFormValues } from "@/validations/education-health.validation";
import type { RegistrationPayload } from "@/types/registration.types";

/**
 * Transform form data to API payload format
 * Handles nested mother/father and education/health objects
 * Transforms string inputs to numbers for API requirements
 */
export function transformToApiPayload(
    studentInfo: StudentInfoFormValues & { child_school: string; child_next_class: string },
    familyInfo: FamilyInfoFormValues,
    educationHealth: EducationHealthFormValues
): RegistrationPayload {
    return {
        student: {
            child_school: parseInt(studentInfo.child_school) || 0,
            child_next_class: studentInfo.child_next_class,
            full_name: studentInfo.full_name,
            birth_place: studentInfo.birth_place,
            family_name: studentInfo.family_name,
            religion: studentInfo.religion || "",
            birthday: studentInfo.birthday,
            age_in_july: parseInt(studentInfo.age_in_july) || 0,
            id_passport_number: parseInt(studentInfo.id_passport_number) || 0,
            gender: parseInt(studentInfo.gender) === 0, // 0 = Male (true), 1 = Female (false)
            nationality: parseInt(studentInfo.nationality) || 0,
            weight_height: studentInfo.weight_height || "",
            sibling_order: parseInt(studentInfo.sibling_order) || 0,
            home_language: studentInfo.home_language,
            living_with: parseInt(studentInfo.living_with) || 0,
        },
        mother: {
            full_name: familyInfo.mother.full_name,
            birthday: familyInfo.mother.birthday,
            age: parseInt(familyInfo.mother.age) || 0,
            religion: familyInfo.mother.religion || "",
            birth_place: familyInfo.mother.birth_place,
            nationality: familyInfo.mother.nationality,
            registration_role: familyInfo.mother.registration_role,
            specialization: familyInfo.mother.specialization || "",
            last_education: familyInfo.mother.last_education || "",
            job_title: familyInfo.mother.job_title || "",
            job_type: familyInfo.mother.job_type || "",
            employer: familyInfo.mother.employer || "",
            employer_address: familyInfo.mother.employer_address || "",
            office_phone: familyInfo.mother.office_phone || "",
            monthly_income: parseInt(familyInfo.mother.monthly_income || "0") || 0,
            email: familyInfo.mother.email,
            phone: familyInfo.mother.phone,
            emergency_phone: familyInfo.mother.emergency_phone || "",
            contact_time: parseInt(familyInfo.mother.contact_time || "0") || 0,
        },
        father: {
            full_name: familyInfo.father.full_name,
            birthday: familyInfo.father.birthday,
            age: parseInt(familyInfo.father.age) || 0,
            religion: familyInfo.father.religion || "",
            birth_place: familyInfo.father.birth_place,
            nationality: familyInfo.father.nationality,
            registration_role: familyInfo.father.registration_role,
            specialization: familyInfo.father.specialization || "",
            last_education: familyInfo.father.last_education || "",
            job_title: familyInfo.father.job_title || "",
            job_type: familyInfo.father.job_type || "",
            employer: familyInfo.father.employer || "",
            employer_address: familyInfo.father.employer_address || "",
            office_phone: familyInfo.father.office_phone || "",
            monthly_income: parseInt(familyInfo.father.monthly_income || "0") || 0,
            email: familyInfo.father.email,
            phone: familyInfo.father.phone,
            emergency_phone: familyInfo.father.emergency_phone || "",
            contact_time: parseInt(familyInfo.father.contact_time || "0") || 0,
        },
        education: {
            previous_school: educationHealth.education.previous_school,
            school_address: educationHealth.education.school_address,
            specialization: educationHealth.education.specialization || "",
            enrollment_year: parseInt(educationHealth.education.enrollment_year) || 0,
            graduation_year: parseInt(educationHealth.education.graduation_year) || 0,
        },
        health: {
            medical_history: educationHealth.health.medical_history || "",
            mobility: parseInt(educationHealth.health.mobility || "0") || 0,
            hearing: parseInt(educationHealth.health.hearing) || 0,
            vision: parseInt(educationHealth.health.vision) || 0,
            future_ambition: educationHealth.health.future_ambition || "",
        },
    };
}
