// Core API response types aligned with backend contract

export interface RootResponse<T = unknown> {
    items: T[];
    total_pages: number;
    per_page: number;
    current_page: number;
}

// Single item response for detail pages
export interface ItemResponse<T = unknown> {
    item: T;
}

// Multilingual text structure from backend
export interface MultilingualText {
    en: string;
    ar: string;
    id: string; // Indonesian
}

// Label with value structure from backend
export interface LabelValue<T = number> {
    value: T;
    label: {
        en: string;
        ar: string;
    };
}

// News Category with multilingual labels
export interface NewsCategory {
    value: number;
    label: {
        ar: string;
        id: string;
        en: string;
    };
}

// Updated FAQ interface (Questions in backend)
export interface Faq {
    id: string;
    question: MultilingualText;
    answer: MultilingualText;
    image: string; // Full URL
    is_visible: LabelValue<0 | 1>;
    created_at?: string;
    updated_at?: string;
}

// Updated News interface
export interface News {
    id: string;
    title: MultilingualText;
    description: MultilingualText;
    category: NewsCategory;
    is_visible: LabelValue<0 | 1>;
    image: string; // Full URL
    date?: Date;
    created_at?: string;
    updated_at?: string;
    details?: NewsDetail[];
    images?: NewsImage[];
}

// News detail section
export interface NewsDetail {
    id: string;
    news_id: string;
    title: MultilingualText;
    description: MultilingualText;
    path: string | null;
}

// News additional images
export interface NewsImage {
    id: string;
    path: string; // Full URL
}

// Legacy interface for backward compatibility (deprecated)
// interface Isvisible {
//     value: number;
//     label: string;
// }
