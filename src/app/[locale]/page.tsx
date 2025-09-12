import HomeActivities from "@/components/home/home-activities";
import HomeArtistic from "@/components/home/home-artistic";
import HomeCurricula from "@/components/home/home-curricula";
import HomeHero from "@/components/home/home-hero";
import HomeNews from "@/components/home/home-news";
import HomeStep from "@/components/home/home-step";
import PrefetchData from "@/components/prefetch-data";
import ActivitiesSection from "@/components/shared/contact-section";
import HomeFAQ from "@/components/shared/faq-section";
import LanguageSection from "@/components/shared/language-section";

export default function Home() {
    return (
        <main className="min-h-lvh bg-[url('/svg/background-grid.svg')] bg-center w-full overflow-hidden">
            <PrefetchData>
                <HomeHero />

                <HomeStep />

                <HomeCurricula />

                <LanguageSection className="mt-16" />

                <HomeActivities />

                <HomeArtistic />

                <HomeNews />

                <HomeFAQ />

                <ActivitiesSection />
            </PrefetchData>
        </main>
    );
}
