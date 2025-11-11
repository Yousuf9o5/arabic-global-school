import { useTranslations } from "next-intl";
import Section from "../ui/section";
import CustomLink from "../ui/Link";
import Image from "next/image";

export default function ActivitiesFacilities() {
    const t = useTranslations("services.facilities");

    const cardsKeys = ["classrooms", "playgrounds", "laboratories", "play_areas", "restrooms", "library"];

    // Images from real-content folder mapped to facilities
    const facilityImages = [
        "/images/activities/real-content/02. الصفحة الثالثة    الصوره الثانية الفصول الدراسية الانشطه.jpeg", // classrooms
        "/images/activities/real-content/03. الصفحة الثالثه (الانشطه ) الصورة الثالثة الملاعب.jpeg", // playgrounds
        "/images/activities/real-content/04.  الانشطه   الصوره الرابعه المختبرات الصفحة الثالثة.jpeg", // laboratories
        "/images/activities/real-content/05. الصفحة الثالثة (الانشطة) الصورة الخامسة مناطق اللعب.jpeg", // play_areas
        "/images/activities/real-content/06. الصفحة الثالثة الانشطه الصوره السادسه دورات المياة.jpeg", // restrooms
        "/images/activities/real-content/07. الصفحة الثالثة (الانشطه ) الصورة السابعه المكتبه.jpeg", // library
    ];

    const cards = cardsKeys.map((key, index) => ({
        title: t(`items.${key}.title`),
        description: t(`items.${key}.desc`),
        imageSrc: facilityImages[index],
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
