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
                duration: 0.7,
                ease: cubicBezier(0.42, 0, 0.58, 1),
            },
        },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.85, y: 30, rotate: -8 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            transition: { duration: 0.8, stiffness: 120, damping: 16 },
        },
    };

    const dotVariants = {
        initial: { y: 0, scale: 1, opacity: 0.7, backgroundColor: "#3B82F6" },
        animate: {
            y: [0, -12, 0],
            scale: [1, 1.25, 1],
            opacity: [0.7, 1, 0.7],
            backgroundColor: ["#3B82F6", "#2563EB", "#3B82F6"],
        },
    };

    const dotTransition = {
        duration: 1.1,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut" as const,
    };

    return (
        <motion.section
            className="relative flex flex-col items-center justify-center min-h-[80lvh] bg-background p-4 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Animated moving gradient background */}
            <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 1.1, x: 0, y: 0 }}
                animate={{
                    opacity: 0.7,
                    scale: 1,
                    x: [0, 40, 0, -40, 0],
                    y: [0, 20, 0, -20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 30%, #e0e7ff 0%, #f0f6ff 60%, transparent 100%)",
                }}
            />
            <div className="flex flex-col items-center justify-center gap-8 relative z-10">
                <motion.div
                    variants={logoVariants}
                    initial="hidden"
                    animate="visible"
                    className="shadow-2xl border border-primary/20 rounded-full backdrop-blur-sm"
                >
                    <AppImage className="w-36 rounded-full" optimized width={500} height={500} src={"/images/logo-school.png"} />
                </motion.div>

                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3 text-xl font-bold text-foreground">
                        <span>{t("message")}</span>
                        <div className="flex w-10 items-center justify-center gap-1 min-w-max">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="block size-2.5 rounded-full"
                                    variants={dotVariants}
                                    transition={{ ...dotTransition, delay: i * 0.25 }}
                                    initial="initial"
                                    animate="animate"
                                />
                            ))}
                        </div>
                    </div>

                    <h3 className="text-muted-foreground text-center max-w-md text-lg font-medium">
                        {t("loading_description", {
                            defaultMessage: "Please wait while we prepare the page for you.",
                        })}
                    </h3>
                </div>
            </div>
        </motion.section>
    );
}
