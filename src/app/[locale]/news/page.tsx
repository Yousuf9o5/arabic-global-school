import NewsHero from "@/components/news/news-hero";
import ContactSection from "@/components/shared/contact-section";

export default function NewsPage() {
    return (
        <main className="min-h-lvh bg-[url('/svg/background-grid.svg')] bg-center w-full overflow-hidden">
            <NewsHero />

            <ContactSection />
        </main>
    );
}
