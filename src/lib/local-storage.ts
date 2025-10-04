/**
 * Generic localStorage utilities with type safety
 */

const STORAGE_PREFIX = "ags_";

/**
 * Save data to localStorage with a prefixed key
 */
export function setData<T>(key: string, data: T): void {
    try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(STORAGE_PREFIX + key, serialized);
    } catch (error) {
        console.error(`Failed to save data to localStorage for key: ${key}`, error);
    }
}

/**
 * Load data from localStorage with a prefixed key
 */
export function loadData<T>(key: string, defaultValue?: T): T | null {
    try {
        const item = localStorage.getItem(STORAGE_PREFIX + key);
        if (item === null) {
            return defaultValue ?? null;
        }
        return JSON.parse(item) as T;
    } catch (error) {
        console.error(`Failed to load data from localStorage for key: ${key}`, error);
        return defaultValue ?? null;
    }
}

/**
 * Remove data from localStorage with a prefixed key
 */
export function removeData(key: string): void {
    try {
        localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
        console.error(`Failed to remove data from localStorage for key: ${key}`, error);
    }
}

/**
 * Clear all registration-related data from localStorage
 */
export function clearRegistrationData(): void {
    const keys = ["student_info", "family_info", "education_health", "attachments"];
    keys.forEach((key) => removeData(key));
}
