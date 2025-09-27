"use client";

import AppImage from "@/components/app-image";
import { cubicBezier, easeInOut } from "motion";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

/**
 * A full-screen loading component displayed during page transitions.
 * It features the school logo, a loading animation, and localized text.
 */
export default function Loading() {
    const t = useTranslations("loading");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                easing: cubicBezier(0.42, 0, 0.58, 1),
            },
        },
    };

    const dotVariants = {
        initial: {
            y: "0%",
        },
        animate: {
            y: "100%",
        },
    };

    const dotTransition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        easing: easeInOut,
    };

    return (
        <motion.section
            className="flex flex-col items-center justify-center min-h-[80lvh] bg-background p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="flex flex-col items-center justify-center gap-6">
                <AppImage className="w-32 rounded-full" optimized width={500} height={500} src={"/images/logo-school.png"} />

                <div className="flex items-center gap-2 text-lg font-medium text-foreground">
                    <p>{t("message")}</p>
                    <div className="flex w-6 items-center justify-center gap-1 min-w-max">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="block size-1.5 rounded-full bg-primary"
                                variants={dotVariants}
                                transition={{ ...dotTransition, delay: i * 0.2 }}
                                initial="initial"
                                animate="animate"
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">
                    {t("loading_description", {
                        defaultMessage: "Please wait while we prepare the page for you.",
                    })}
                </p>
            </div>
        </motion.section>
    );
}
