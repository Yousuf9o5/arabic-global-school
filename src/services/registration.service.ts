import { RegistrationPayload, RegistrationResponse } from "@/types/registration.types";
import { API } from "./api.base";

/**
 * Submit registration data to the server
 */
export async function submitRegistration(data: RegistrationPayload): Promise<RegistrationResponse> {
    const response = await API.post<RegistrationResponse>("/students", data);
    return response.data;
}

/**
 * Upload a single image for registration
 * Returns the path string from the API
 */
export async function uploadRegistrationImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await API.post<{ path: string }>("/students/images", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.path;
}

/**
 * Upload images for registration
 * Note: Adjust based on actual file upload endpoint
 */
export async function uploadRegistrationImages(files: File[]): Promise<string[]> {
    const paths: string[] = [];

    for (const file of files) {
        const path = await uploadRegistrationImage(file);
        paths.push(path);
    }

    return paths;
}
