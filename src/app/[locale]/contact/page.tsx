import ContactHero from "@/components/contact/contact-hero";
import ContactSection from "@/components/shared/contact-section";
import FAQSection from "@/components/shared/faq-section";

export default function ContactPage() {
    return (
        <main className="min-h-lvh bg-[url('/svg/background-grid.svg')] bg-center w-full overflow-hidden">
            <ContactHero />

            <FAQSection />

            <ContactSection />
        </main>
    );
}
