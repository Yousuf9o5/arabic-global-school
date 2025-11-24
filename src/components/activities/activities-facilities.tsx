import { useTranslations } from "next-intl";
import Section from "../ui/section";
import CustomLink from "../ui/Link";
import Image from "next/image";
import { activitiesRealContentImages } from "./real-content-images";

export default function ActivitiesFacilities() {
    const t = useTranslations("services.facilities");

    const cardsKeys = ["classrooms", "playgrounds", "laboratories", "play_areas", "restrooms", "library"] as const;

    // Latest activity shots pulled from the real-content folder
    const facilityImages: Record<(typeof cardsKeys)[number], string> = {
        classrooms: activitiesRealContentImages.classrooms,
        playgrounds: activitiesRealContentImages.playgrounds,
        laboratories: activitiesRealContentImages.laboratories,
        play_areas: activitiesRealContentImages.playAreas,
        restrooms: activitiesRealContentImages.restrooms,
        library: activitiesRealContentImages.library,
    };

    const cards = cardsKeys.map((key) => ({
        title: t(`items.${key}.title`),
        description: t(`items.${key}.desc`),
        imageSrc: facilityImages[key],
    }));

    return (
        <Section className="space-y-4 md:space-y-8">
            <h1 className="section-header text-center md:text-start">{t("title")}</h1>

            <div className="flex items-center justify-between">
                <p className="section-description text-content-natural-primary/50 max-w-[530px]">{t("subtitle")}</p>

                <CustomLink shadow={"default"} href="">
                    {t("register")}
                </CustomLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <article key={card.title + index} className="flex flex-col bg-[#F2F6FC] rounded-[40px]">
                        <Image
                            width={422}
                            height={312}
                            src={card.imageSrc}
                            alt={card.title}
                            className="w-full object-cover object-center h-[321px] rounded-[38px] flex-shrink-0 p-2"
                        />

                        <div className="text-center md:text-start p-6">
                            <h3 className="font-semibold text-2xl">{card.title}</h3>
                            <p className="text-content-natural-primary/50 md:text-lg">{card.description}</p>
                        </div>
                    </article>
                ))}
            </div>
        </Section>
    );
}
