"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import NewsCard from "../news-card";
import NewsCardSkeleton from "./news-card-skeleton";
import Section from "../ui/section";
import { APIKeys } from "@/services/api-keys";
import { ApiService } from "@/services/api.service";
import { Locale } from "@/i18n/routing";

export default function NewsHighlight({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
    const t = useTranslations("news_item");
    const { locale } = useParams();

    const { data = { items: [] }, isLoading } = useQuery({
        queryKey: [APIKeys.NEWS_API_KEY, JSON.stringify(searchParams)],
        queryFn: () => ApiService.getNewsWithParams(searchParams),
    });

    return (
        <Section>
            <div className="flex flex-col items-center mb-6">
                <h1 className="section-header text-center mx-auto">{t("highlight.title")}</h1>
                <h1 className="section-header font-normal text-center mx-auto">{t("highlight.subtitle")}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => <NewsCardSkeleton key={index + "skeleton"} hideBadge className="bg-primary/10" />)
                    : data.items.slice(0, 6).map((news, index) => {
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
                                  created_at={news.created_at?.toString()}
                                  imageAlt={title}
                                  category={news.category.value?.toString() || ""}
                              />
                          );
                      })}
            </div>
        </Section>
    );
}
