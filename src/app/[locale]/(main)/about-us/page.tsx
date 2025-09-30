import AboutUsHero from "@/components/about-us/about-us-hero";
import AboutUsMessage from "@/components/about-us/about-us-message";
import AboutUsMission from "@/components/about-us/about-us-mission";
import AboutUsValues from "@/components/about-us/about-us-values";
import AboutUsVision from "@/components/about-us/about-us-vision";
import ContactSection from "@/components/shared/contact-section";

export default function AboutUs() {
    return (
        <main>
            <AboutUsHero />

            <AboutUsVision />

            <AboutUsMission />

            <AboutUsMessage />

            <AboutUsValues />

            <ContactSection />
        </main>
    );
}
