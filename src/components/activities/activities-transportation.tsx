import { useTranslations } from "next-intl";
import Section from "../ui/section";
import Image from "next/image";
import { Pin3DIcon } from "@/assets/icons";

export default function ActivitiesTransportation() {
    const t = useTranslations("services.transportation");

    const keys = ["clean_buses", "punctuality", "supervisor"];

    // Images from real-content folder - using school bus image for all transportation cards
    const transportationImages = [
        "/images/activities/real-content/09. الصفحة الثالثة (الانشطه) باص المدرسة الصوره التاسعه.jpeg", // clean_buses
        "/images/activities/bus-image-2.jpg", // punctuality (reuse)
        "/images/activities/bus-image-1.jpg", // supervisor (reuse)
    ];

    const cards = keys.map((key, index) => ({
        title: t(`points.${key}.title`),
        image: transportationImages[index],
    }));

    return (
        <Section size="screen" className="bg-background-container rounded-[48px]">
            <Section.Inner className="py-16 lg:py-36 w-fit">
                <div className="max-w-2xl mx-auto space-y-4">
                    <h1 className="section-header text-center">{t("title")}</h1>
                    <p className="section-description text-center">{t("subtitle")}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12 w-fit mx-auto">
                    {cards.map((card, index) => (
                        <div key={card.title + index} className={`max-w-sm mx-auto ${index === cards.length - 1 ? "col-span-1 md:col-span-2 lg:col-span-1" : ""}`}>
                            <article key={card.title + index} className="flex flex-col bg-white rounded-[40px]">
                                <Image
                                    width={450}
                                    height={450}
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full object-cover object h-[321px] rounded-[38px] flex-shrink-0 p-2"
                                />
                                <div className="text-center md:text-start p-6">
                                    <h3 className="font-medium text-lg">{card.title}</h3>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                <div className="relative bg-secondary-solid py-4 text-center rounded-full text-sm md:text-lg lg:text-2xl">
                    <Pin3DIcon className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary/10 animate-spin-slow pointer-events-none select-none" />

                    {t("register")}
                </div>
            </Section.Inner>
        </Section>
    );
}
