import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { PropsWithChildren } from "react";

const sectionVariants = cva("flex flex-col flex-1 overflow-x-clip overflow-y-visible", {
    variants: {
        size: {
            default: "max-w-8xl w-full mx-auto first-of-type:pt-16 pb-16 px-4 md:px-8",
            screen: "w-full bg-white",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

interface Props extends PropsWithChildren, VariantProps<typeof sectionVariants> {
    className?: string;
}

function Section({ children, size, className }: Props) {
    return <section className={cn(sectionVariants({ className, size }))}>{children}</section>;
}

interface PropsInner extends PropsWithChildren {
    className?: string;
}

Section.Inner = function ({ children, className }: PropsInner) {
    return <div className={cn(sectionVariants({ className }))}>{children}</div>;
} as React.FC<PropsInner>;

Section.Inner.displayName = "Section.Inner";

export default Section;
