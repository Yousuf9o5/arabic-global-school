import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useTranslations } from "next-intl";

interface Option {
    label: string;
    value: string;
}

interface FormSelectProps {
    name: string;
    label?: string;
    options: Option[];
    placeholder?: string;
    disabled?: boolean;
}

export function FormSelect({ name, label, options, placeholder, disabled }: FormSelectProps) {
    const t = useTranslations("common");
    const { control } = useFormContext();

    return (
        <FormField
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
                    <FormControl>
                        <Select value={field.value} onValueChange={field.onChange} disabled={disabled}>
                            <SelectTrigger
                                id={name}
                                size="lg"
                                className="rounded-[12px] w-full px-4 py-3 !text-[#6A81B0] border-[#D5DEF1] focus-visible:ring-[#D5DEF1] [&_svg]:stroke-[#6A81B0]"
                            >
                                <SelectValue placeholder={placeholder || t("choose")} />
                            </SelectTrigger>

                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem className="!text-[#6A81B0]" key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
            )}
        />
    );
}
