"use client";

import { SearchIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import Section from "../ui/section";
import { FilterButtons } from "../ui/filter-buttons";
import NewsCard from "../news-card";
import NewsCardSkeleton from "./news-card-skeleton";
import NoNewsData from "./no-news-data";
import { APIKeys } from "@/services/api-keys";
import { ApiService } from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    searchParams: Record<string, string | string[] | undefined>;
}

export default function NewsCards({ searchParams }: Props) {
    const { locale } = useParams();
    const t = useTranslations("news.announcements");
    const router = useRouter();
    const currentSearchParams = useSearchParams();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState<string>((searchParams.search as string) || "");
    const [category, setCategory] = useState<string>((searchParams.category as string) || "");

    const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
    const categoryTimerRef = useRef<NodeJS.Timeout | null>(null);

    const { data = { items: [] }, isLoading } = useQuery({
        queryKey: [APIKeys.NEWS_API_KEY, JSON.stringify(searchParams)],
        queryFn: () => ApiService.getNewsWithParams({ searchParams }),
    });

    useEffect(() => {
        if (searchTimerRef.current) {
            clearTimeout(searchTimerRef.current);
        }

        searchTimerRef.current = setTimeout(() => {
            const params = new URLSearchParams(currentSearchParams.toString());

            if (searchQuery) {
                params.set("search", searchQuery);
            } else {
                params.delete("search");
            }

            const newUrl = params.toString() ? `?${params.toString()}` : "";
            router.replace(newUrl || pathname, { scroll: false });
        }, 500);

        return () => {
            if (searchTimerRef.current) {
                clearTimeout(searchTimerRef.current);
            }
        };
    }, [searchQuery]);

    useEffect(() => {
        if (categoryTimerRef.current) {
            clearTimeout(categoryTimerRef.current);
        }

        categoryTimerRef.current = setTimeout(() => {
            const params = new URLSearchParams(currentSearchParams.toString());

            if (category) {
                params.set("category", category);
            } else {
                params.delete("category");
            }

            const newUrl = params.toString() ? `?${params.toString()}` : "";
            router.replace(newUrl || pathname, { scroll: false });
        }, 300);

        return () => {
            if (categoryTimerRef.current) {
                clearTimeout(categoryTimerRef.current);
            }
        };
    }, [category]);

    const handleResetFilters = useCallback(() => {
        setSearchQuery("");
        setCategory("");
        router.replace(pathname, { scroll: false });
    }, [router]);

    const hasActiveFilters = searchQuery || category;

    return (
        <Section>
            <div className="flex flex-col items-center gap-8">
                <h1 className="section-header text-center mx-auto max-w-[759px]">{t("title")}</h1>

                <div className="flex gap-2 border border-natural-primary px-4 py-3 rounded-full max-w-[660px] focus-within:ring-2 ring-natural-primary mx-auto w-full">
                    <SearchIcon className="text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-base"
                        placeholder={t("search_placeholder")}
                        aria-label={t("search_placeholder")}
                    />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <FilterButtons
                        items={[
                            { label: t("filters.announcements"), value: "0" },
                            { label: t("filters.events"), value: "1" },
                            { label: t("filters.awards"), value: "2" },
                            { label: t("filters.moments"), value: "3" },
                        ]}
                        onChange={(val) => setCategory(val)}
                        defaultValue={category}
                    />

                    {hasActiveFilters && (
                        <button
                            onClick={handleResetFilters}
                            className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                        >
                            {t("reset_filters")}
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => <NewsCardSkeleton key={index + "skeleton"} hideBadge className="bg-primary/10" />)
                    : data.items.length > 0
                    ? data.items.map((news, index) => {
                          const title = news.title?.[locale as Locale];
                          const description = news.description?.[locale as Locale];

                          return (
                              <NewsCard
                                  hideBadge
                                  key={index + "news-card"}
                                  className="bg-primary/10 hover:bg-primary hover:-rotate-2 hover:border-s-border-secondary hover:text-white"
                                  calenderSectionClass="group-hover:text-white"
                                  id={news.id}
                                  title={title}
                                  description={description}
                                  image={news.image}
                                  created_at={news.date?.toString()}
                                  imageAlt={title}
                                  category={news.category.value?.toString() || ""}
                              />
                          );
                      })
                    : null}
            </div>

            {!isLoading && data.items.length === 0 && <NoNewsData onReset={hasActiveFilters ? handleResetFilters : undefined} />}
        </Section>
    );
}
