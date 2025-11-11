"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import AppImage from "../app-image";
import { Card, CardContent } from "../ui/card";
import Section from "../ui/section";

function EducationalProgramsSafeStart() {
    const t = useTranslations("educational_programs.safe_start");

    const cardKeys = ["kindergarten", "primary", "intermediate", "ICO"];

    // Images from curricula folder
    const programImages = [
        "/images/curricula/07. الصفحة الرابعة.jpeg", // kindergarten
        "/images/curricula/08. الصفحة الرابعة.jpeg", // primary
        "/images/curricula/09. الصفحة الرابعة.jpeg", // intermediate
        "/images/curricula/10. الصفحة الرابعة.jpeg", // ICO
    ];

    const programs = Array.from({ length: 4 }, (_, i) => ({
        title: t(`programs.${cardKeys[i]}.title`),
        description: t(`programs.${cardKeys[i]}.desc`),
        image: programImages[i],
    }));

    const svgs = [
        "/svg/curricula/curricula-svg-1.svg",
        "/svg/curricula/curricula-svg-2.svg",
        "/svg/curricula/curricula-svg-3.svg",
        "/svg/curricula/curricula-svg-4.svg",
    ];

    return (
        <Section size={"screen"} className="bg-[#F9F8F4]">
            <Section.Inner>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="section-header max-w-lg">{t("title")}</h1>
                    <p className="mt-2 max-w-xl section-description">{t("subtitle")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-2 mt-8 *:flex-1 ">
                    {programs.map((stage, stageIdx) => (
                        <motion.div
                            key={`${stageIdx}-${stage.title}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: stageIdx * 0.2, duration: 0.8, type: "spring" }}
                        >
                            <Card className="py-2 overflow-hidden h-full">
                                <CardContent className="flex flex-col items-center px-2 pb-6">
                                    <div className="relative w-full">
                                        <div className="curricula-image-container bg-white border-4 border-white  rounded-3xl overflow-hidden w-full relative z-10">
                                            <AppImage
                                                optimized
                                                width={150}
                                                height={150}
                                                src={stage.image}
                                                alt={stage.title}
                                                className="w-full object-cover object-center transition-transform duration-300 h-[270px]"
                                            />
                                        </div>
                                        <AppImage
                                            width={150}
                                            height={150}
                                            src={svgs[stageIdx]}
                                            alt={stage.title}
                                            className="size-56 h-auto object-cover transition-transform duration-300 absolute -right-4 -bottom-12"
                                        />
                                        <div className="curricula-image-container bg-white scale-y-[1.1] scale-x-[1.05] absolute inset-0 rounded-3xl"></div>
                                    </div>
                                    <div className="px-3 mt-10 w-full">
                                        <h3 className="font-bold text-[24px] leading-[100%] mb-2">{stage.title}</h3>
                                        <p className="text-content-natural-secondary text-sm mt-1">{stage.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section.Inner>
        </Section>
    );
}

export default EducationalProgramsSafeStart;
