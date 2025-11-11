import React from "react";
import Section from "../ui/section";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "../ui/card";
import AppImage from "../app-image";

function HomeStep() {
    const t = useTranslations("home.step");

    return (
        <Section>
            <div>
                <h1 className="section-header text-center">
                    {t("title.part1")} <br /> {t("title.part2")}
                </h1>

                <h3 className="section-description text-center max-w-2xl mx-auto mt-4 lg:mt-8 md:mt-6">{t("paragraph")}</h3>
            </div>

            <div className="flex items-stretch flex-col-reverse lg:flex-row gap-4 mt-8">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col gap-4 w-full lg:max-w-md overflow-hidden">
                    <Card className="bg-background-container flex-row lg:min-h-[220px] flex-1 overflow-hidden">
                        <div className="flex flex-col gap-4 ps-4 md:ps-6">
                            <h3 className="font-bold sm:text-[24px] leading-[100%] tracking-[0] pt-4">{t("env")}</h3>
                            <p className="text-natural-tertiary break-words">{t("envParagraph")}</p>
                        </div>

                        <div className="w-72">
                            <AppImage className="size-full scale-[1.75]" src={"/svg/step-cards/env-svg.svg"} />
                        </div>
                    </Card>

                    <Card className="bg-background-container flex-row lg:min-h-[220px] flex-1 overflow-hidden">
                        <div className="flex flex-col gap-4 ps-4 md:ps-6 w-fit">
                            <h3 className="font-bold sm:text-[24px] leading-[100%] tracking-[0]">{t("education")}</h3>
                            <p className="mt-auto text-natural-tertiary">{t("educationParagraph")}</p>
                        </div>
                        <div className="w-72 grid place-items-center">
                            <AppImage className="size-full scale-[1.25] me-16 rtl:-translate-x-10" src={"/svg/step-cards/education-svg.svg"} />
                        </div>
                    </Card>
                </div>

                <div className="flex flex-col md:flex-row gap-4 flex-1 *:flex-1">
                    <Card className="bg-background-container pt-2">
                        <CardContent className="px-2">
                            <div className="p-2 bg-white rounded-3xl">
                                <AppImage optimized width={450} height={260} className="rounded-2xl w-full max-h-[260px] object-cover object-center" src={"/images/home/02. الصفحة الاولى الصورة الثانية.jpeg"} />
                            </div>
                            <div className="flex flex-col gap-4 w-fit mt-8">
                                <h3 className="font-bold sm:text-[24px] leading-[100%] tracking-[0]">{t("balance")}</h3>
                                <p className="mt-auto text-natural-tertiary">{t("balanceParagraph")}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-background-container pt-2">
                        <CardContent className="px-2">
                            <div className="p-2 bg-white rounded-3xl">
                                <AppImage optimized width={450} height={245} className="rounded-2xl w-full max-h-[260px] object-cover object-center" src={"/images/home/03. الصفحة الاولى الصورة الثالثة.jpeg"} />
                            </div>
                            <div className="flex flex-col gap-4 mt-8">
                                <h3 className="font-bold sm:text-[24px] leading-[100%] tracking-[0]">{t("team")}</h3>
                                <p className="mt-auto text-natural-tertiary">{t("teamParagraph")}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Section>
    );
}

export default HomeStep;
