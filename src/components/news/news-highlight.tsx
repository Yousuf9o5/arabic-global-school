"use client";

import { useTranslations } from "next-intl";
import NewsCard from "../news-card";
import Section from "../ui/section";

export default function NewsHighlight() {
    const t = useTranslations("news_item");

    return (
        <Section>
            <div className="flex flex-col items-center mb-6">
                <h1 className="section-header text-center mx-auto">{t("highlight.title")}</h1>
                <h1 className="section-header font-normal text-center mx-auto">{t("highlight.subtitle")}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <NewsCard
                        hideBadge
                        key={index + "news-card"}
                        className="bg-primary/10 hover:bg-primary hover:-rotate-2 hover:border-s-border-secondary hover:text-white"
                        calenderSectionClass="group-hover:text-white"
                    />
                ))}
            </div>
        </Section>
    );
}
