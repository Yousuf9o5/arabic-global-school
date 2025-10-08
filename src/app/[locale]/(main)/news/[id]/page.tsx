import NewsDetails from "@/components/news/news-details";
import NewsHighlight from "@/components/news/news-highlight";
import { NewsDetailPrefetchData } from "@/components/prefetch-data";
import ContactSection from "@/components/shared/contact-section";
import { ApiService } from "@/services/api.service";
import type { Metadata } from "next";

interface Props {
    params: Promise<{ id: string; locale: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, locale } = await params;

    try {
        const data = await ApiService.getNewsById(id);
        const news = data.item;

        const title = news.title?.[locale as keyof typeof news.title] || "News";
        const description = news.description?.[locale as keyof typeof news.description] || "";

        return {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                images: news.image ? [{ url: news.image }] : [],
            },
        };
    } catch {
        return {
            title: "News",
            description: "News article",
        };
    }
}

export default async function NewsArticlePage({ params, searchParams: SP }: Props) {
    const { id } = await params;
    const searchParams = await SP;

    return (
        <main className="min-h-lvh w-full overflow-hidden">
            <NewsDetailPrefetchData searchParams={searchParams} id={id}>
                <NewsDetails id={id} />

                <NewsHighlight searchParams={searchParams} />

                <ContactSection />
            </NewsDetailPrefetchData>
        </main>
    );
}
