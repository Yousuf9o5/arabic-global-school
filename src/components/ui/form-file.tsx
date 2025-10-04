"use client";

import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import { UploadIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

interface FormInputProps {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    description?: string;
    hint?: string;
    accept?: string;
    multiple?: boolean;
}

export default function FormFile({
    name,
    label,
    type = "file",
    placeholder,
    disabled,
    className,
    description,
    hint,
    accept,
    multiple = false,
}: FormInputProps) {
    const t = useTranslations("common");
    const ref = useRef<HTMLInputElement>(null);
    const { control } = useFormContext();
    const [previews, setPreviews] = useState<string[]>([]);

    const onChoseFile = () => {
        ref.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: FileList | File | null) => void) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            setPreviews([]);
            onChange(null);
            return;
        }

        // Generate previews for images
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
        const previewUrls = imageFiles.map((file) => URL.createObjectURL(file));
        setPreviews(previewUrls);

        // Pass FileList for multiple, File for single
        onChange(multiple ? files : files[0]);
    };

    const removeFile = (index: number, currentValue: FileList | File | null, onChange: (value: FileList | File | null) => void) => {
        if (!currentValue) return;

        // Revoke the preview URL
        URL.revokeObjectURL(previews[index]);

        if (multiple && currentValue instanceof FileList) {
            const dt = new DataTransfer();
            Array.from(currentValue).forEach((file, i) => {
                if (i !== index) dt.items.add(file);
            });
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            onChange(dt.files.length > 0 ? dt.files : null);
        } else {
            setPreviews([]);
            onChange(null);
        }

        // Reset input
        if (ref.current) ref.current.value = "";
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ...field }, fieldState }) => (
                <FormItem className={className}>
                    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                    <FormDescription>{description}</FormDescription>
                    <FormControl>
                        <input
                            accept={accept}
                            id={name}
                            type="file"
                            placeholder={placeholder}
                            disabled={disabled}
                            multiple={multiple}
                            className="hidden"
                            {...field}
                            ref={ref}
                            onChange={(e) => handleFileChange(e, onChange)}
                        />
                    </FormControl>

                    {previews.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index, value, onChange)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={onChoseFile}
                        className="flex flex-col items-center border-2 border-dashed border-[#A3AAB9] bg-background-container py-4 px-6 cursor-pointer rounded-2xl w-full"
                        type="button"
                    >
                        <div className="p-3 bg-white rounded-full size-12 grid place-items-center mb-2">
                            <UploadIcon />
                        </div>

                        <div className="text-center">
                            <h4 className="leading-[140%] text-center">{t("drag_label")}</h4>
                            <p className="font-medium leading-[130%] text-center underline underline-offset-0 decoration-solid text-primary">
                                {t("select_file")}
                            </p>
                            <p className="text-[#6A81B0]">{hint}</p>
                        </div>
                    </button>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}
