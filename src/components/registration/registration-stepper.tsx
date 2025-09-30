"use client";

import { CertificateIcon, CheckBadgeIcon, DocumentIcon, GraduatedIcon, PaperUploadIcon, UserBadgeIcon, UsersIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const steps = [
    {
        title: "Student Information",
        description: "Provide the student's basic personal details such as full name, date of birth, nationality, and current grade.",
        icon: <UserBadgeIcon className="size-6" />,
        path: "/registration/student-info",
    },
    {
        title: "Family Information",
        description: "Include details about parents or guardians, such as names, occupations, contact information, and more.",
        icon: <UsersIcon className="size-6" />,
        path: "/registration/family-info",
    },
    {
        title: "Educational and Health Background",
        description: "Share the student's academic history and any relevant health information, including allergies, conditions, or support needs.",
        icon: <GraduatedIcon className="size-6" />,
        path: "/registration/education-health",
    },
    {
        title: "Required Attachments",
        description: "Upload the necessary documents such as ID, previous school records, vaccination card, and recent photos.",
        icon: <PaperUploadIcon className="size-6" />,
        path: "/registration/attachments",
    },
];

export function RegistrationStepper() {
    const pathname = usePathname();
    const current = steps.findIndex((step) => pathname?.startsWith(step.path));

    return (
        <div className="flex flex-col items-center gap-8 bg-[#EFEFEF] px-8 py-16 max-w-[480px]">
            {steps.map((step, i) => (
                <div key={step.title} className="flex gap-4 items-start">
                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0.7 }}
                            animate={{ scale: i === current ? 1.1 : 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            className={cn(
                                "flex items-center justify-center rounded-[12px] border-2 w-12 h-14 mb-1 text-lg font-bold",
                                i < current
                                    ? "border-primary bg-primary text-white"
                                    : i === current
                                    ? "border-primary bg-primary text-white shadow-lg"
                                    : "border-border bg-background text-[#6A81B0]"
                            )}
                        >
                            {i < current ? (
                                <CheckBadgeIcon className="text-white size-6" />
                            ) : i === current ? (
                                step.icon
                            ) : (
                                <span>{i + 1}</span>
                            )}
                        </motion.div>

                        {i < steps.length - 1 && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: current === i ? 60 : 40, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 * i }}
                                className={cn(
                                    "w-px mx-auto mt-10",
                                    i < current ? "bg-primary" : "bg-border"
                                )}
                            />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className={cn(
                            "font-bold text-lg",
                            i === current ? "text-primary" : i < current ? "text-primary/80" : "text-foreground"
                        )}>{step.title}</div>
                        <div className={cn(
                            "text-sm mt-1",
                            i === current ? "text-primary/80" : "text-muted-foreground"
                        )}>{step.description}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
