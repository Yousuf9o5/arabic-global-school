import NewsCards from "@/components/news/news-cards";
import NewsHero from "@/components/news/news-hero";
import ContactSection from "@/components/shared/contact-section";

export default function NewsPage() {
    return (
        <main className="min-h-lvh bg-center w-full overflow-hidden">
            <NewsHero />

            <NewsCards />

            <ContactSection />
        </main>
    );
}
