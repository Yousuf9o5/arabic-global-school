"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { HappyCalenderIcon } from "@/assets/icons";
import { cn, formatDate } from "@/lib/utils";
import { Locale } from "@/i18n/routing";
import { APIKeys } from "@/services/api-keys";
import { ApiService } from "@/services/api.service";
import { useTranslations } from "next-intl";

import Section from "../ui/section";

/**
 * Presents the news article details with dynamic content from API.
 */

/** Props for the `NewsDetails` component. */
interface NewsDetailsProps {
    /** News ID to fetch */
    id: string;
    /** Optional classes to extend the root section wrapper. */
    className?: string;
}

export default function NewsDetails({ id, className }: NewsDetailsProps) {
    const { locale } = useParams();
    const t = useTranslations();

    const { data } = useQuery({
        queryKey: [APIKeys.NEWS_DETAIL_API_KEY, id],
        queryFn: () => ApiService.getNewsById(id),
    });

    const news = data?.item;

    if (!news) return null;

    const title = news.title?.[locale as Locale];
    const description = news.description?.[locale as Locale];

    return (
        <Section className={cn("gap-16", className)}>
            <div className="flex flex-col gap-6 lg:items-center lg:gap-16">
                <div className="w-full space-y-6">
                    <div className="flex w-fit items-center gap-2 rounded-xl bg-solid-light px-4 py-2 text-primary">
                        <HappyCalenderIcon />
                        <span>{formatDate(new Date(news.created_at || new Date()), t)}</span>
                    </div>

                    <h1 className="section-header text-[56px] max-w-6xl">{title}</h1>

                    <p className="section-description text-balance">{description}</p>
                </div>

                <div className="w-full">
                    <Image
                        priority
                        className="h-full w-full rounded-3xl object-cover max-h-[552px]"
                        width={772}
                        height={442}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src={news.image}
                        alt={title || "News image"}
                    />
                </div>
            </div>

            {news.details?.map((detail, index) => {
                const detailTitle = detail.title?.[locale as Locale];
                const detailDescription = detail.description?.[locale as Locale];
                const isEven = index % 2 === 0;

                return (
                    <div
                        key={detail.id}
                        className={cn("flex flex-col gap-6 lg:items-center lg:gap-32 relative", isEven ? "lg:flex-row" : "lg:flex-row-reverse")}
                    >
                        <div className={cn("w-full space-y-6 text-center flex-1 lg:text-start max-w-xl relative", isEven ? "me-auto" : "ms-auto")}>
                            <h2 className="section-header text-balance">{detailTitle}</h2>

                            <p className="md:text-[24px] leading-[100%] tracking-[0] text-content-natural-primary">{detailDescription}</p>

                            {isEven && (
                                <Image
                                    className="absolute top-full start-[90%] hidden lg:block ltr:rotate-30 ltr:-scale-x-100"
                                    width={200}
                                    height={200}
                                    src="/svg/hero/arrow-in-1.svg"
                                    alt=""
                                    aria-hidden="true"
                                />
                            )}

                            {!isEven && (
                                <Image
                                    className="absolute top-full end-[95%] hidden lg:block ltr:-scale-x-100 ltr:-rotate-45"
                                    width={200}
                                    height={200}
                                    src="/svg/hero/arrow-in-2.svg"
                                    alt=""
                                    aria-hidden="true"
                                />
                            )}
                        </div>

                        <div className="w-full max-w-lg h-[400px]">
                            {detail.path ? (
                                <Image
                                    className="h-full w-full rounded-3xl object-cover"
                                    width={500}
                                    height={400}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    src={detail.path}
                                    alt={detailTitle || "Detail image"}
                                />
                            ) : (
                                <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-4 p-8">
                                    <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
                                        <svg
                                            className="w-10 h-10 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-gray-500 text-base font-medium text-center">
                                        {t("news_item.no_image_available")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {news.images && news.images.length > 0 && (
                <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex-1">
                        <Image
                            className="w-full rounded-3xl object-cover h-96 md:h-auto max-h-[700px]"
                            width={1048}
                            height={400}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src={news.images[0].path}
                            alt="News gallery image 1"
                        />
                    </div>

                    {news.images.length > 1 && (
                        <div className="md:w-64 grid grid-cols-3 md:grid-cols-1 gap-6">
                            {news.images.slice(1, 4).map((img, idx) => (
                                <div key={img.id} className="relative">
                                    {idx === 2 && news.images && news.images.length > 4 && (
                                        <div className="absolute inset-0 rounded-xl md:rounded-3xl bg-black/50 grid place-items-center text-4xl text-white">
                                            {news.images.length - 3}+
                                        </div>
                                    )}
                                    <Image
                                        className="h-32 md:h-full rounded-xl md:rounded-3xl object-cover"
                                        width={262}
                                        height={200}
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        src={img.path}
                                        alt={`News gallery image ${idx + 2}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Section>
    );
}
