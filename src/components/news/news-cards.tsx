"use client";

import { SearchIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import Section from "../ui/section";
import { FilterButtons } from "../ui/filter-buttons";
import NewsCard from "../news-card";

export default function NewsCards() {
    const t = useTranslations("news.announcements");

    return (
        <Section>
            <div className="flex flex-col items-center gap-8">
                <h1 className="section-header text-center mx-auto max-w-[759px]">{t("title")}</h1>

                <div className="flex gap-2 border border-natural-primary px-4 py-3 rounded-full max-w-[660px] focus-within:ring-2 ring-natural-primary mx-auto w-full">
                    <SearchIcon className="text-muted-foreground" />
                    <input
                        type="text"
                        className="flex-1 bg-transparent border-none outline-none text-base"
                        placeholder={t("search_placeholder")}
                        aria-label={t("search_placeholder")}
                    />
                </div>

                <FilterButtons
                    items={[
                        { label: t("filters.notices"), value: "notices" },
                        { label: t("filters.events"), value: "events" },
                        { label: t("filters.awards"), value: "awards" },
                        { label: t("filters.moments"), value: "moments" },
                    ]}
                    onChange={() => {}}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <NewsCard hideBadge key={index + "news-card"} className="bg-primary/10 hover:bg-primary hover:-rotate-2 hover:border-s-border-secondary hover:text-white" calenderSectionClass="group-hover:text-white" />
                ))}
            </div>
        </Section>
    );
}
