"use client";

import { useTranslations } from "next-intl";
import Section from "../ui/section";
import { EducationalProgramsCircleIcon, EducationProgramsBlackCircleIcon } from "@/assets/icons";
import VideoPlayer from "../ui/video-player";
import Image from "next/image";

function EducationalProgramsStages() {
    const t = useTranslations("educational_programs.stages");

    const kindergartenActivitiesKeys = ["art_physical", "linguistic_cultural", "music_arts", "physical_education"];
    const elementaryActivitiesKeys = ["art_ages", "creative_workshops", "physical_sports", "music_performance"];

    return (
        <Section size={"screen"} className="bg-background-container">
            <Section.Inner className="gap-8">
                <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 w-fit mb-4 mx-auto">
                    <EducationalProgramsCircleIcon />
                    <span>{t("enrichment")}</span>
                </div>

                <h1 className="section-header max-w-lg mx-auto text-center">{t("title")}</h1>

                {/* large screens cards */}
                <div className="hidden md:flex *:flex-1 gap-8">
                    <div className="flex flex-col gap-4 p-[72px] bg-white rounded-[40px] lg:rounded-[48px]">
                        <h2 className="font-medium text-3xl max-w-sm">{t("kindergarten.title")}</h2>

                        <div className="flex flex-col items-end gap-2">
                            <div
                                className="px-6 py-3 justify-center items-center gap-2 bg-secondary-solid rounded-full font-medium min-w-max w-fit"
                                style={{ boxShadow: "0 7px 16px 0 rgba(255, 222, 34, 0.30), 0 -4px 10.9px 0 rgba(255, 255, 255, 0.80) inset" }}
                            >
                                Speak English!
                            </div>

                            <div
                                className="px-6 py-3 justify-center items-center gap-2 bg-danger-solid text-white rounded-full font-medium w-fit mx-auto"
                                style={{ boxShadow: "0 7px 16px 0 rgba(240, 93, 37, 0.30), 0 2px 7.4px 0 rgba(255, 255, 255, 0.25) inset" }}
                            >
                                Membentuk Pemimpin!
                            </div>

                            <div
                                className="px-6 py-3 justify-center items-center gap-2 bg-primary-solid text-white rounded-full font-medium w-fit me-12"
                                style={{ boxShadow: "0 7px 16px 0 rgba(0, 100, 226, 0.30), 0 2px 7.4px 0 rgba(255, 255, 255, 0.25) inset" }}
                            >
                                عربيه!
                            </div>
                        </div>

                        <div className="flex flex-col">
                            {kindergartenActivitiesKeys.map((key) => (
                                <div key={key} className="flex items-center gap-4 mb-4 last:mb-0">
                                    <EducationProgramsBlackCircleIcon />
                                    <span className="text-xl">{t(`kindergarten.activities.${key}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 p-[72px] bg-white rounded-[40px] lg:rounded-[48px]">
                        <h2 className="font-bold text-3xl">{t("elementary.title")}</h2>

                        <div className="mt-16 h-[160px] relative">
                            <Image
                                className="absolute end-[120px]"
                                src="/images/educational-programs/stages/art-and-arabic-calligraphy.png"
                                alt=""
                                width={120}
                                height={120}
                            />
                            <Image
                                className="absolute end-0 top-12"
                                src="/images/educational-programs/stages/swimming.png"
                                alt=""
                                width={120}
                                height={120}
                            />

                            <Image
                                className="absolute end-0 -top-16"
                                src="/images/educational-programs/stages/theater-and-drama.png"
                                alt=""
                                width={120}
                                height={120}
                            />

                            <Image
                                className="absolute end-0 top-12"
                                src="/images/educational-programs/stages/swimming.png"
                                alt=""
                                width={120}
                                height={120}
                            />

                            <Image
                                className="absolute end-[100px] top-40"
                                src="/images/educational-programs/stages/self-defense.png"
                                alt=""
                                width={120}
                                height={120}
                            />
                        </div>

                        <div className="flex flex-col">
                            {elementaryActivitiesKeys.map((key) => (
                                <div key={key} className="flex items-center gap-4 mb-4 last:mb-0">
                                    <EducationProgramsBlackCircleIcon />
                                    <span className="text-xl">{t(`elementary.activities.${key}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* small screens cards */}
                <div className="flex md:hidden/ *:flex-1 gap-8 flex-col">
                    <div className="flex flex-col items-center gap-4 px-4 py-8 bg-white rounded-[40px] lg:rounded-[48px] relative overflow-hidden">
                        <h2 className="my-6 font-medium text-3xl max-w-sm text-center">{t("kindergarten.title")}</h2>

                        <div
                            className="absolute top-32 -end-4 px-6 py-3 justify-center items-center gap-2 bg-secondary-solid rounded-full font-medium min-w-max w-fit"
                            style={{ boxShadow: "0 7px 16px 0 rgba(255, 222, 34, 0.30), 0 -4px 10.9px 0 rgba(255, 255, 255, 0.80) inset" }}
                        >
                            Speak English!
                        </div>

                        <div
                            className="bottom-16 -start-20 absolute px-6 py-3 justify-center items-center gap-2 bg-danger-solid text-white rounded-full font-medium w-fit mx-auto"
                            style={{ boxShadow: "0 7px 16px 0 rgba(240, 93, 37, 0.30), 0 2px 7.4px 0 rgba(255, 255, 255, 0.25) inset" }}
                        >
                            Membentuk Pemimpin!
                        </div>

                        <div
                            className="absolute bottom-4 end-4 px-6 py-3 justify-center items-center gap-2 bg-primary-solid text-white rounded-full font-medium w-fit"
                            style={{ boxShadow: "0 7px 16px 0 rgba(0, 100, 226, 0.30), 0 2px 7.4px 0 rgba(255, 255, 255, 0.25) inset" }}
                        >
                            عربيه!
                        </div>

                        <div className="flex flex-col">
                            {kindergartenActivitiesKeys.map((key) => (
                                <div key={key} className="flex flex-col items-center gap-2 mb-4 last:mb-0">
                                    <EducationProgramsBlackCircleIcon />
                                    <span className="text-lg">{t(`kindergarten.activities.${key}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 px-4 py-8 bg-white rounded-[40px] lg:rounded-[48px] relative">
                        <h2 className="my-6 font-medium text-3xl max-w-sm">{t("elementary.title")}</h2>

                        {/* Left side images */}
                        <div className="absolute start-4 top-56 flex flex-col gap-8 pointer-events-none">
                            <Image
                                className=""
                                src="/images/educational-programs/stages/art-and-arabic-calligraphy.png"
                                alt=""
                                width={75}
                                height={75}
                            />

                            <Image className="" src="/images/educational-programs/stages/theater-and-drama.png" alt="" width={75} height={75} />
                        </div>

                        {/* Right side images */}
                        <div className="absolute end-4 top-56 flex flex-col gap-8 pointer-events-none">
                            <Image className="" src="/images/educational-programs/stages/self-defense.png" alt="" width={75} height={75} />

                            <Image className="" src="/images/educational-programs/stages/swimming.png" alt="" width={75} height={75} />
                        </div>

                        <div className="flex flex-col mb-8 mx-8">
                            {elementaryActivitiesKeys.map((key) => (
                                <div key={key} className="flex flex-col items-center gap-2 mb-4 last:mb-0">
                                    <EducationProgramsBlackCircleIcon />
                                    <span className="text-lg">{t(`elementary.activities.${key}`)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <VideoPlayer
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    poster={"/images/educational-programs/stages/video-background.png"}
                    className="h-[430px] lg:h-[568px] rounded-[40px] lg:rounded-[48px]"
                />
            </Section.Inner>
        </Section>
    );
}

export default EducationalProgramsStages;
