"use client";

import { SearchIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import Section from "../ui/section";
import { FilterButtons } from "../ui/filter-buttons";

export default function NewsCards() {
    const t = useTranslations("news.announcements");

    return (
        <Section>
            <div className="space flex flex-col items-center gap-[30px]">
                <h1 className="section-header text-center mx-auto max-w-[759px]">{t("title")}</h1>

                <div className="flex gap-2 border border-natural-primary px-4 py-3 rounded-full max-w-[660px] focus-within:ring-2 ring-natural-primary mx-auto w-full">
                    <SearchIcon />

                    <input type="text" className="!border-none !outline-none flex-1" />
                </div>

                <FilterButtons items={["Notices", "Events", "Awards", "Moments"]} onChange={function (value: string): void {}} />
            </div>
        </Section>
    );
}
