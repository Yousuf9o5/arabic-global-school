import { useEffect, useState } from "react";
import { loadData, setData } from "@/lib/local-storage";

export type FormDataKeys = "class_info" | "student_info" | "family_info" | "education_health" | "attachments";

export default function useFormData<T>({ key, onLoad }: { key: FormDataKeys; onLoad: (data: T) => void }) {
    const [formData, setFormData] = useState<T>();

    useEffect(() => {
        const data = loadData<T>(key);
        if (!data) return;

        onLoad(data);
        setFormData(data);
    }, [key]);

    const updateFormData = (newData: T) => {
        setFormData((prev) => ({ ...prev, ...newData }));
        setData(key, { ...formData, ...newData });
    };

    return { formData, updateFormData };
}
