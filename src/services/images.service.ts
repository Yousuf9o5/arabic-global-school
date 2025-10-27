import { API } from "./api.base";

export interface HeroImage {
    id: string;
    path: string;
    is_visible: {
        value: number;
        label: {
            en: string;
            ar: string;
        };
    };
    created_at: string;
}

export interface HeroImageResponse {
    data: HeroImage;
}

/**
 * Fetch the hero image from the API
 */
export async function fetchHeroImage(): Promise<HeroImage | null> {
    try {
        const response = await API.get<HeroImageResponse>("/images");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching hero image:", error);
        return null;
    }
}
