import NewsDetails from "@/components/news/news-details";
import NewsHighlight from "@/components/news/news-highlight";
import ContactSection from "@/components/shared/contact-section";

export default function NewsArticlePage() {
    return (
        <main className="min-h-lvh w-full overflow-hidden">
            <NewsDetails />

            <NewsHighlight />

            <ContactSection />
        </main>
    );
}
