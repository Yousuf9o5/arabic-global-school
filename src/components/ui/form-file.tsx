"use client";

import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "./form";
import { UploadIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";

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
}

export default function FormFile({ name, label, type = "text", placeholder, disabled, className, description, hint, accept }: FormInputProps) {
    const t = useTranslations("common");
    const ref = useRef<HTMLInputElement>(null);
    const { control } = useFormContext();

    const onChoseFile = () => {
        ref.current?.click();
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormItem className={className}>
                    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                    <FormDescription>{description}</FormDescription>
                    <FormControl>
                        <input
                            accept={accept}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="hidden"
                            {...field}
                            ref={ref}
                        />
                    </FormControl>

                    <button
                        onClick={onChoseFile}
                        className="flex flex-col items-center border-2 border-dashed border-[#A3AAB9] bg-background-container py-4 px-6 cursor-pointer rounded-2xl"
                        type="button"
                    >
                        <div className="p-3 bg-white rounded-full size-12 grid place-items-center mb-2">
                            <UploadIcon />
                        </div>

                        <div className="text-center">
                            <h4 className="leading-[140%] text-center">{t("drag_label")}</h4>
                            <p className="font-medium leading-[130%] text-center underline underline-offset-0 decoration-solid">{t("select_file")}</p>
                            <p className="text-[#6A81B0]">{hint}</p>
                        </div>
                    </button>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}
