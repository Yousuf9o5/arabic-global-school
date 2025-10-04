import type { StudentInfoFormValues } from "@/validations/student-info.validation";
import type { FamilyInfoFormValues } from "@/validations/family-info.validation";
import type { EducationHealthFormValues } from "@/validations/education-health.validation";
import type { RegistrationPayload } from "@/types/registration.types";

/**
 * Transform form data to API payload format
 */
export function transformToApiPayload(
    studentInfo: StudentInfoFormValues,
    familyInfo: FamilyInfoFormValues,
    educationHealth: EducationHealthFormValues,
    schoolId: number = 1,
    nextClass: string = "Grade 1"
): RegistrationPayload {
    return {
        student: {
            child_school: schoolId,
            child_next_class: nextClass,
            full_name: studentInfo.fullName,
            birth_place: studentInfo.placeOfBirth,
            family_name: studentInfo.surname || "",
            religion: studentInfo.religion || "",
            birthday: studentInfo.dateOfBirth,
            age_in_july: parseInt(studentInfo.ageAsOfJuly) || 0,
            id_passport_number: parseInt(studentInfo.nationalId) || 0,
            gender: studentInfo.gender === "male",
            nationality: "", // Add nationality field to form if needed
            sibling_order: mapSiblingPosition(studentInfo.childPosition),
            home_language: studentInfo.primaryLanguage,
        },
        mother: {
            full_name: familyInfo.motherName,
            email: familyInfo.emailAddress,
            phone: familyInfo.phoneNumber,
            age: familyInfo.parentAge ? parseInt(familyInfo.parentAge) : undefined,
            job_title: familyInfo.occupation || undefined,
            employer: familyInfo.workPlace || undefined,
            employer_address: familyInfo.officeAddress || undefined,
            office_phone: familyInfo.landlinePhone || undefined,
            monthly_income: familyInfo.monthlyIncome ? parseInt(familyInfo.monthlyIncome) : undefined,
        },
        father: {
            full_name: familyInfo.fatherName,
            email: familyInfo.emailAddress, // You may want separate email fields
            phone: familyInfo.phoneNumber, // You may want separate phone fields
            age: familyInfo.parentAge ? parseInt(familyInfo.parentAge) : undefined,
            job_title: familyInfo.occupation || undefined,
            employer: familyInfo.workPlace || undefined,
            employer_address: familyInfo.officeAddress || undefined,
            office_phone: familyInfo.landlinePhone || undefined,
            monthly_income: familyInfo.monthlyIncome ? parseInt(familyInfo.monthlyIncome) : undefined,
        },
        education: {
            previous_school: educationHealth.previousSchool,
            school_address: educationHealth.schoolAddress,
            specialization: educationHealth.fieldOfStudy || undefined,
            enrollment_year: parseInt(educationHealth.enrollmentYear) || 0,
            graduation_year: parseInt(educationHealth.graduationYear) || 0,
        },
        health: {
            medical_history: educationHealth.medicalHistory || undefined,
            hearing: educationHealth.hearing,
            vision: educationHealth.vision,
            future_ambition: educationHealth.futureAspiration,
        },
    };
}

/**
 * Map sibling position text to number
 */
function mapSiblingPosition(position: string): number {
    const mapping: Record<string, number> = {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        other: 0,
    };
    return mapping[position] || 0;
}
