import { useTranslations } from "next-intl";
import Section from "../ui/section";
import Image from "next/image";

export default function AboutUsValues() {
    const t = useTranslations("about_us.values");

    const keys = ["excellence", "integrity", "respect", "collaboration"];

    const svgs = ["/svg/about-us/medal-star.svg", "/svg/about-us/heart.svg", "/svg/about-us/happy-face.svg", "/svg/about-us/two-users.svg"];

    const cards = keys.map((key, index) => ({
        title: t(`${key}.title`),
        desc: t(`${key}.desc`),
        svg: svgs[index],
    }));

    return (
        <Section className="py-16 md:py-24 lg:py-32">
            <h1 className="section-header text-center max-w-xl mx-auto">{t("title")}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-20">
                {cards.map((card, index) => (
                    <article key={index} className="p-4 border bg-background-container rounded-[40px] h-[450px]">
                        <div className="h-[200px] bg-white rounded-[40px] grid place-items-center mb-4">
                            <Image width={100} height={100} src={card.svg} alt={card.title} className="object-contain" />
                        </div>

                        <h2 className="font-bold mb-4 text-3xl">{card.title}</h2>
                        <p className="text-content-natural-primary/70 font-medium">{card.desc}</p>
                    </article>
                ))}
            </div>
        </Section>
    );
}
