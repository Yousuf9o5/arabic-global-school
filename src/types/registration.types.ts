/**
 * Type definitions for registration API
 */

export interface StudentData {
    child_school: number;
    child_next_class: string;
    full_name: string;
    birth_place: string;
    family_name: string;
    religion: string;
    birthday: string;
    age_in_july: number;
    id_passport_number: number;
    gender: boolean;
    nationality: number;
    weight_height: string;
    sibling_order: number;
    home_language: string;
    living_with: number;
}

export interface ParentData {
    full_name: string;
    birthday: string;
    age: number;
    religion: string;
    birth_place: string;
    nationality: string;
    registration_role: string;
    specialization: string;
    last_education: string;
    job_title: string;
    job_type: string;
    employer: string;
    employer_address: string;
    office_phone: string;
    monthly_income: number;
    email: string;
    phone: string;
    emergency_phone: string;
    contact_time: number;
}

export interface EducationData {
    previous_school: string;
    school_address: string;
    specialization: string;
    enrollment_year: number;
    graduation_year: number;
}

export interface HealthData {
    medical_history: string;
    mobility: number;
    hearing: number;
    vision: number;
    future_ambition: string;
}

export interface ImageData {
    ids: string;
    path: string;
    type: string; // "student_photo" | "birth_certificate" | "family_card" | "parents_id"
}

export interface RegistrationPayload {
    student: StudentData;
    mother: ParentData;
    father: ParentData;
    education: EducationData;
    health: HealthData;
    images?: ImageData[];
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
    data?: {
        id: number;
        student_id: string;
    };
}
