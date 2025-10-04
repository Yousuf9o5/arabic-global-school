"use client";

import { motion } from "motion/react";

/**
 * A loading skeleton that mirrors the registration form layout structure.
 * Displays animated placeholder blocks matching the actual page components.
 */
export default function Loading() {
    const pulseAnimation = {
        animate: {
            opacity: [0.5, 0.8, 0.5],
        },
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut" as const,
        },
    };

    return (
        <section className="mx-auto my-8 w-full max-w-[660px] px-4">
            {/* Header skeleton */}
            <div className="mb-14 space-y-3 text-center">
                <motion.div
                    className="mx-auto h-6 w-32 rounded-lg bg-primary/20"
                    animate={pulseAnimation.animate}
                    transition={pulseAnimation.transition}
                />
                <motion.div
                    className="mx-auto h-8 w-64 rounded-lg bg-content-natural-secondary/20 md:h-10"
                    animate={pulseAnimation.animate}
                    transition={{ ...pulseAnimation.transition, delay: 0.1 }}
                />
                <motion.div
                    className="mx-auto h-5 w-80 max-w-full rounded-lg bg-natural-tertiary/20"
                    animate={pulseAnimation.animate}
                    transition={{ ...pulseAnimation.transition, delay: 0.2 }}
                />
            </div>

            {/* Form skeleton */}
            <div className="flex flex-col gap-4">
                {/* Full-width fields */}
                {[1, 2, 3].map((i) => (
                    <div key={`full-${i}`} className="space-y-2">
                        <motion.div
                            className="h-4 w-24 rounded bg-content-natural-secondary/20"
                            animate={pulseAnimation.animate}
                            transition={{ ...pulseAnimation.transition, delay: 0.1 * i }}
                        />
                        <motion.div
                            className="h-12 w-full rounded-xl border border-[#D5DEF1] bg-[#F7FAFF]"
                            animate={pulseAnimation.animate}
                            transition={{ ...pulseAnimation.transition, delay: 0.1 * i + 0.05 }}
                        />
                    </div>
                ))}

                {/* Grid layout skeleton (2 columns on md+) */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={`grid-${i}`} className="space-y-2">
                            <motion.div
                                className="h-4 w-28 rounded bg-content-natural-secondary/20"
                                animate={pulseAnimation.animate}
                                transition={{ ...pulseAnimation.transition, delay: 0.15 * i }}
                            />
                            <motion.div
                                className="h-12 w-full rounded-xl border border-[#D5DEF1] bg-[#F7FAFF]"
                                animate={pulseAnimation.animate}
                                transition={{ ...pulseAnimation.transition, delay: 0.15 * i + 0.05 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Button skeleton */}
                <motion.div
                    className="mt-4 h-12 w-full rounded-full bg-primary/20"
                    animate={pulseAnimation.animate}
                    transition={{ ...pulseAnimation.transition, delay: 0.3 }}
                />
            </div>
        </section>
    );
}
