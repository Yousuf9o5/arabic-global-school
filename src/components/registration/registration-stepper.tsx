"use client";

import { ArrowRightIcon, CheckBadgeIcon, GraduatedIcon, PaperUploadIcon, UserBadgeIcon, UsersIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Link } from "@/i18n/routing";

export function RegistrationStepper() {
    const { back } = useRouter();
    const t = useTranslations("register");
    const pathname = usePathname();

    const steps = [
        {
            title: t("steps.studentInfo"),
            description: t("steps.studentInfoDescription"),
            icon: <UserBadgeIcon className="size-6" />,
            path: "/student-info",
        },
        {
            title: t("steps.familyInfo"),
            description: t("steps.familyInfoDescription"),
            icon: <UsersIcon className="size-6" />,
            path: "/family-info",
        },
        {
            title: t("steps.educationHealth"),
            description: t("steps.educationHealthDescription"),
            icon: <GraduatedIcon className="size-6" />,
            path: "/education-health",
        },
        {
            title: t("steps.attachments"),
            description: t("steps.attachmentsDescription"),
            icon: <PaperUploadIcon className="size-6" />,
            path: "/attachments",
        },
    ];

    const current = steps.findIndex((step) => pathname?.endsWith(step.path));

    return (
        <div className="hidden lg:flex flex-col items-center gap-8 bg-[#EFEFEF] px-8 py-16 max-w-[480px]">
            <div className="">
                {steps.map((step, i) => (
                    <div key={step.title} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0.9 }}
                                animate={{
                                    scale: i === current ? 1.1 : 1,
                                    opacity: i === current ? 1 : 0.9,
                                    backgroundColor: i === current ? "white" : "",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                                className="flex items-center justify-center rounded-[12px] border border-border-primary w-12 h-14 mb-1 text-lg font-bold"
                            >
                                {i < current ? (
                                    <CheckBadgeIcon className="text-white size-6" />
                                ) : i === current ? (
                                    step.icon
                                ) : (
                                    <span className="text-[#A3AAB9]">{i + 1}</span>
                                )}
                            </motion.div>
                            {i < steps.length - 1 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: current === i ? 60 : 40, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                    className="w-px mx-auto mt-8 mb-5 bg-[#D5DEF1]"
                                />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className={cn("font-bold text-lg", i === current ? "text-content-natural-secondary" : "text-content-natural-secondary/50")}>
                                {step.title}
                            </div>
                            <div className={cn("text-sm mt-1", i === current ? "text-natural-tertiary" : "text-natural-tertiary/50")}>
                                {step.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto w-full">
                <Button className="w-fit !bg-transparent" asChild variant={"ghost"} onClick={back}>
                    <Link href="/">
                        <ArrowRightIcon className="ltr:-scale-x-100" /> {t("backToHome")}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
