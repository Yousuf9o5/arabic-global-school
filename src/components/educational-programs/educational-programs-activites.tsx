import { useTranslations } from "next-intl";
import Section from "../ui/section";
import Image from "next/image";

export default function EducationalProgramsActivities() {
    const t = useTranslations("educational_programs.activities");

    const keys = ["trips", "collaborative_activities", "family_participation"];

    // Images from curricula folder
    const images = [
        "/images/curricula/11. الصفحة الرابعة.jpeg", // trips
        "/images/curricula/10. الصفحة الرابعة.jpeg", // collaborative_activities (reuse)
        "/images/curricula/09. الصفحة الرابعة.jpeg", // family_participation (reuse)
    ];

    const items = keys.map((key, index) => ({
        image: images[index],
        title: t(`programs.${key}.title`),
        description: t(`programs.${key}.desc`),
    }));

    return (
        <Section size={"screen"} className="bg-background-container">
            <Section.Inner className="max-w-[1220px] flex-col-reverse lg:flex-row items-stretch gap-8 lg:gap-20">
                <div className="flex flex-col gap-4 mx-auto max-w-lg md:max-w-none">
                    <h1 className="section-header text-center max-w-lg mx-auto">{t("title")}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 w-fit mx-auto">
                        {items.map((item, index) => (
                            <div
                                key={item.title + index}
                                className={`max-w-sm mx-auto h-full ${index === items.length - 1 ? "col-span-1 md:col-span-2 lg:col-span-1" : ""}`}
                            >
                                <article key={item.title + index} className="flex flex-col bg-white rounded-[40px] h-full">
                                    <Image
                                        width={320}
                                        height={240}
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full object-cover object h-[321px] rounded-[38px] flex-shrink-0 p-2"
                                    />

                                    <div className="text-center md:text-start p-6">
                                        <h3 className="font-medium text-xl mb-4">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </Section.Inner>
        </Section>
    );
}
