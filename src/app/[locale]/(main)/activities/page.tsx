import ContactSection from "@/components/shared/contact-section";
import ActivitiesFacilities from "@/components/activities/activities-facilities";
import ActivitiesHero from "@/components/activities/activities-hero";
import ActivitiesMeal from "@/components/activities/activities-meal";
import ActivitiesSafety from "@/components/activities/activities-safety";
import ActivitiesTransportation from "@/components/activities/activities-transportation";

export default function ServicesPage() {
    return (
        <main>
            <ActivitiesHero />

            <ActivitiesFacilities />

            <ActivitiesSafety />

            <ActivitiesTransportation />

            <ActivitiesMeal />

            <ContactSection />
        </main>
    );
}
