import { BoldCalenderIcon, MealPointIcon } from "@/assets/icons";
import Section from "../ui/section";
import { useTranslations } from "next-intl";
import VideoPlayer from "../ui/video-player";

export default function ServicesMeal() {
    const t = useTranslations("services.meal");

    const pointsKeys = ["bring_plate", "no_outside_food", "organize_week"];

    const points = pointsKeys.map((key) => t(`rules.points.${key}`));

    return (
        <Section size={"screen"} className="">
            <div className="m-2 bg-content-secondary rounded-[48px] min-h-96 flex flex-col items-center gap-16 py-16 px-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FFFDC2] rounded-[48px]"></div>
                    <BoldCalenderIcon />
                </div>

                <div className="mx-auto max-w-lg text-center">
                    <h1 className="section-header mb-6">{t("title")}</h1>
                    <p className="section-description text-content-natural-primary/50">{t("subtitle")}</p>
                </div>

                <div className="h-[316px] md:h-[568px]  w-full">
                    <VideoPlayer
                        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                        poster="/images/services/meal/c9e9f519d8d6d64a271d921003e159f77426dfbc.png"
                        className="lg:aspect-video w-full h-full"
                    />
                </div>

                <div className="">
                    <h1 className="section-header mb-6 py-8">{t("rules.title")}</h1>

                    {
                        points.map((point, index) => (
                            <div key={index + point} className="flex items-start gap-4 mb-6 last:mb-0">
                                <MealPointIcon />
                                <p className="text-content-natural-primary/50">{point}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Section>
    );
}
