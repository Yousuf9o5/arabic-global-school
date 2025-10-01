import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";

interface FormInputProps {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export function FormInput({ name, label, type = "text", placeholder, disabled, className }: FormInputProps) {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormItem className={className}>
                    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            className="rounded-[12px] w-full px-4 py-3 !text-[#6A81B0] border-[#D5DEF1] focus-visible:ring-[#D5DEF1] [&_svg]:stroke-[#6A81B0] placeholder:text-[#6A81B0] h-12"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}
