import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer border border-transparent rounded-full",
    {
        variants: {
            variant: {
                default: "bg-primary !text-primary-foreground border-[2px] border-[rgba(204,224,249,1)] hover:bg-primary/90",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border border-border-natural-dark bg-transparent hover:bg-accent hover:text-accent-foreground !text-content-natural-primary",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "px-6 py-4 has-[>svg]:px-3",
                sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "px-6 py-4 has-[>svg]:px-4",
                icon: "size-9",
            },
            shadow: {
                default: "shadow-default-button",
                destructive: "",
                outline: "",
                secondary: "",
                ghost: "",
                link: "",
                white: "shadow-button-white",
                none: "",
            },
        },
        defaultVariants: {
            variant: "default",
            shadow: "none",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    shadow,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className, shadow }))} {...props} />;
}

export { Button, buttonVariants };
