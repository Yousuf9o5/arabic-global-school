import NewsCards from "@/components/news/news-cards";
import NewsHero from "@/components/news/news-hero";
import { NewsPrefetchData } from "@/components/prefetch-data";
import ContactSection from "@/components/shared/contact-section";

interface Props {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function NewsPage({ searchParams: SP }: Props) {
    const searchParams = await SP;

    return (
        <main className="min-h-lvh bg-center w-full overflow-hidden">
            <NewsPrefetchData searchParams={searchParams}>
                <NewsHero />

                <NewsCards searchParams={searchParams} />

                <ContactSection />
            </NewsPrefetchData>
        </main>
    );
}
