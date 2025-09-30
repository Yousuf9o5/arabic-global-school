import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

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
                            <SelectTrigger id={name}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
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
