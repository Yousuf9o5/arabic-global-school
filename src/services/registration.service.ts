import { RegistrationPayload, RegistrationResponse } from "@/types/registration.types";
import { API } from "./api.base";

/**
 * Response from image upload API
 */
interface ImageUploadResponse {
    item: {
        id: string;
        type: string;
        path: string;
    };
}

/**
 * Submit registration data to the server
 */
export async function submitRegistration(data: RegistrationPayload): Promise<RegistrationResponse> {
    const response = await API.post<RegistrationResponse>("/students", data);
    return response.data;
}

/**
 * Upload a single image for registration
 * Returns the uploaded image data including id, type, and path
 * 
 * @param file - The file to upload
 * @param type - Image type (0-3): 0=student_photo, 1=birth_certificate, 2=family_card, 3=parents_id
 * @param studentId - Optional student ID (can be omitted for initial upload)
 */
export async function uploadRegistrationImage(
    file: File, 
    type: string,
    studentId?: string
): Promise<ImageUploadResponse["item"]> {
    const formData = new FormData();
    formData.append("path", file);
    formData.append("type", type);
    if (studentId) {
        formData.append("student_id", studentId);
    }

    const response = await API.post<ImageUploadResponse>("/studentImage", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.item;
}

/**
 * Delete uploaded image
 */
export async function deleteRegistrationImage(imageId: string): Promise<void> {
    await API.delete(`/studentImage/${imageId}`);
}
