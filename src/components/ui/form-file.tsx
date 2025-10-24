"use client";

import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import { UploadIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import { ImagePreviewList } from "./image-preview-list";

interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
    type: string;
    path?: string;
    uploaded?: boolean;
    uploadedId?: string;
}

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

    const onChoseFile = () => {
        ref.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: UploadedFile[]) => void, currentValue: UploadedFile[]) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const newFiles: UploadedFile[] = [];
        Array.from(files).forEach((file) => {
            const uploadedFile: UploadedFile = {
                id: Math.random().toString(36).substring(7),
                file,
                type: name,
                preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
            };
            newFiles.push(uploadedFile);
        });

        if (multiple) {
            onChange([...currentValue, ...newFiles]);
        } else {
            // Clean up old preview
            if (currentValue[0]?.preview) {
                URL.revokeObjectURL(currentValue[0].preview);
            }
            onChange(newFiles);
        }

        // Reset input
        if (ref.current) ref.current.value = "";
    };

    const removeFile = (id: string, currentValue: UploadedFile[], onChange: (value: UploadedFile[]) => void) => {
        const fileToRemove = currentValue.find((f) => f.id === id);
        if (fileToRemove?.preview) {
            URL.revokeObjectURL(fileToRemove.preview);
        }

        const newFiles = currentValue.filter((f) => f.id !== id);
        onChange(newFiles);
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value = [], ...field }, fieldState }) => (
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
                            onChange={(e) => handleFileChange(e, onChange, value)}
                        />
                    </FormControl>

                    <button
                        onClick={onChoseFile}
                        className="flex flex-col items-center border-2 border-dashed border-[#A3AAB9] bg-background-container py-4 px-6 cursor-pointer rounded-2xl w-full hover:border-primary/50 transition-colors "
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
                            <p className="text-[#6A81B0] text-sm">{hint}</p>
                        </div>
                    </button>

                    {/* Image Preview List */}
                    <ImagePreviewList files={value} onRemove={(id) => removeFile(id, value, onChange)} />

                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}
