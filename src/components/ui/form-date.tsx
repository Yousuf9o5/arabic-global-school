import { CalenderIcon } from "@/assets/icons";
import { useFormContext } from "react-hook-form";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import type { Matcher } from "react-day-picker";

interface Props {
    name: string;
    label: string;
    optional?: boolean;
    hidden?: Matcher | Matcher[];
}

function FormDate({ name, label, optional, hidden }: Props) {
    const { control } = useFormContext();

    // Calculate the maximum allowed date (15 years ago)
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());

    // Set a reasonable minimum date (e.g., 100 years ago)
    const minDate = new Date(today.getFullYear() - 100, 0, 1);

    // Combine custom hidden dates with the age restriction
    const combinedHidden = [
        // Hide dates after maxDate (younger than 15 years)
        { after: maxDate },
        // Hide dates before minDate (older than 100 years)
        { before: minDate },
        // Include any additional hidden dates passed as props
        ...(Array.isArray(hidden) ? hidden : hidden ? [hidden] : []),
    ];

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>{label + (optional ? " (اختياري)" : "")}</FormLabel>
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="!bg-white justify-start text-left font-sans rounded-xl h-[52px] font-semibold">
                                    <CalenderIcon className="size-6" />
                                    {field.value
                                        ? new Date(field.value).toLocaleDateString("ar-US", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                          })
                                        : "الرجاء اختيار تاريخ الميلاد"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={field.onChange}
                                    disabled={combinedHidden}
                                    captionLayout="dropdown"
                                    defaultMonth={maxDate}
                                    showOutsideDays={false}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default FormDate;
