"use client";

import { useTranslations } from "next-intl";
import Section from "../ui/section";
import { useState } from "react";
import { CircleIcon } from "@/assets/icons";
import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import AppImage from "../app-image";

function HomeCurricula() {
    const t = useTranslations("home.curricula");
    const [currentStage, setCurrentStage] = useState(0);

    // Image mappings for each stage
    const stageImages = [
        // Kindergarten (new images based on content)
        [
            "/images/home/الصفحة الأولى الصورة الرابعة نور البيان.JPG",
            "/images/home/الصفحة الأولى الصورة الخامسة الأنشطة الفنية والإبداعية.JPG",
            "/images/home/الصفحة الأولى الصورة السادسة كامبريدج.JPG",
            "/images/home/الصفحة الأولى الصورة السابعة ICO.JPG",
        ],
        // Primary (images 08-10, reuse 08 for 4th card)
        [
            "/images/home/08. الصفحة الاولى الصورة الثامنة نور البيان ابتدائي.jpeg",
            "/images/home/09. الصفحة الاولى الصورة التاسعه كامبردج ابتدائي.jpeg",
            "/images/home/10. الصفحة الاولى الصورة العاشرة ابتدائي ICO.jpeg",
            "/images/home/08. الصفحة الاولى الصورة الثامنة نور البيان ابتدائي.jpeg", // Reuse for 4th card
        ],
        // Intermediate (use primary images as fallback)
        [
            "/images/home/08. الصفحة الاولى الصورة الثامنة نور البيان ابتدائي.jpeg",
            "/images/home/09. الصفحة الاولى الصورة التاسعه كامبردج ابتدائي.jpeg",
            "/images/home/10. الصفحة الاولى الصورة العاشرة ابتدائي ICO.jpeg",
            "/images/home/08. الصفحة الاولى الصورة الثامنة نور البيان ابتدائي.jpeg",
        ],
        // Secondary (use primary images as fallback)
        [
            "/images/home/08. الصفحة الاولى الصورة الثامنة نور البيان ابتدائي.jpeg",
            "/images/home/09. الصفحة الاولى الصورة التاسعه كامبردج ابتدائي.jpeg",
            "/images/home/10. الصفحة الاولى الصورة العاشرة ابتدائي ICO.jpeg",
            "/images/home/08. الصفحة الاولى الصورة الثامنة نور البيان ابتدائي.jpeg",
        ],
    ];

    const stages = [
        {
            title: t("kindergarten"),
            cards: Array.from({ length: 4 }, (_, j) => ({
                title: t(`kindergartenStages.${j}.title`),
                description: t(`kindergartenStages.${j}.desc`),
                image: stageImages[0][j],
            })),
        },
        {
            title: t("primary"),
            cards: Array.from({ length: 4 }, (_, j) => ({
                title: t(`kindergartenStages.${j}.title`),
                description: t(`kindergartenStages.${j}.desc`),
                image: stageImages[1][j],
            })),
        },
        {
            title: t("intermediate"),
            cards: Array.from({ length: 4 }, (_, j) => ({
                title: t(`kindergartenStages.${j}.title`),
                description: t(`kindergartenStages.${j}.desc`),
                image: stageImages[2][j],
            })),
        },
        {
            title: t("secondary"),
            cards: Array.from({ length: 4 }, (_, j) => ({
                title: t(`kindergartenStages.${j}.title`),
                description: t(`kindergartenStages.${j}.desc`),
                image: stageImages[3][j],
            })),
        },
    ];

    const handleStageChange = (index: number) => {
        setCurrentStage(index);
    };

    const svgs = [
        "/svg/curricula/curricula-svg-1.svg",
        "/svg/curricula/curricula-svg-2.svg",
        "/svg/curricula/curricula-svg-3.svg",
        "/svg/curricula/curricula-svg-4.svg",
    ];

    return (
        <Section className="bg-background-main" size="screen">
            <Section.Inner className="flex flex-col w-full overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="section-header">{t("title")}</h1>
                    <p className="mt-2 max-w-xl section-description">{t("desc")}</p>
                </div>

                <div className="flex md:justify-center w-full overflow-auto mt-8 md:mt-16">
                    {stages.map((stage, index) => (
                        <button
                            className={`flex flex-col gap-2 min-w-[290px] border-b py-4 transition-all ${
                                currentStage === index ? "border-primary border-b-3" : "border-border-natural-dark"
                            }`}
                            key={index + "stage"}
                            onClick={() => handleStageChange(index)}
                        >
                            <div className="flex items-center">
                                {currentStage === index && (
                                    <motion.div
                                        initial={{ scale: 0.7, opacity: 0, marginInlineEnd: "0rem" }}
                                        animate={{ scale: 1, opacity: 1, marginInlineEnd: "0.5rem" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CircleIcon />
                                    </motion.div>
                                )}

                                <span
                                    className={`md:text-[18px] text-[20px] leading-[100%] ${
                                        currentStage === index ? "font-medium" : "text-natural-tertiary"
                                    }`}
                                >
                                    {stage.title}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-2 mt-8 *:flex-1 ">
                    {stages[currentStage].cards.map((card, idx) => (
                        <motion.div
                            key={`${idx}-${stages[currentStage].title}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.2, duration: 0.8, type: "spring" }}
                        >
                            <Card className="py-2 overflow-hidden h-full">
                                <CardContent className="flex flex-col items-center px-2 pb-6">
                                    <div className="relative w-full">
                                        <div className="curricula-image-container bg-white border-4 border-white  rounded-3xl overflow-hidden w-full relative z-10">
                                            <AppImage
                                                optimized
                                                width={450}
                                                height={450}
                                                src={card.image}
                                                alt={card.title}
                                                className="w-full object-cover transition-transform duration-300 h-[220px]"
                                            />
                                        </div>
                                        <AppImage
                                            width={150}
                                            height={150}
                                            src={svgs[idx]}
                                            alt={card.title}
                                            className="size-56 h-auto object-cover transition-transform duration-300 absolute -right-4 -bottom-12"
                                        />
                                        <div className="curricula-image-container bg-white scale-y-[1.1] scale-x-[1.05] absolute inset-0 rounded-3xl"></div>
                                    </div>

                                    <div className="px-3 mt-10 w-full">
                                        <h3 className="font-bold text-[24px] leading-[100%] mb-2">{card.title}</h3>
                                        <p className="text-content-natural-secondary text-sm mt-1">{card.description}</p>
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

export default HomeCurricula;
