import AboutUsHero from "@/components/about-us/about-us-hero";
import AboutUsMission from "@/components/about-us/about-us-mission";
import AboutUsVision from "@/components/about-us/about-us-vision";
import ContactSection from "@/components/shared/contact-section";

export default function AboutUs() {
    return (
        <main>
            <AboutUsHero />

            <AboutUsVision />

            <AboutUsMission />

            <ContactSection />
        </main>
    );
}
