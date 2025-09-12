import EducationalProgramsActivities from "@/components/educational-programs/educational-programs-activites";
import EducationalProgramsHero from "@/components/educational-programs/educational-programs-hero";
import EducationalProgramsMonitoring from "@/components/educational-programs/educational-programs-monitoring";
import EducationalProgramsSafeStart from "@/components/educational-programs/educational-programs-safe-start";
import EducationalProgramsStages from "@/components/educational-programs/educational-programs-stages";
import EducationalProgramsValues from "@/components/educational-programs/educational-programs-values";
import ActivitiesSection from "@/components/shared/contact-section";
import LanguageSection from "@/components/shared/language-section";

export default function EducationalProgramsPage() {
    return (
        <main>
            <EducationalProgramsHero />

            <EducationalProgramsSafeStart />

            <EducationalProgramsValues />

            <EducationalProgramsStages />

            <EducationalProgramsActivities />

            <LanguageSection />

            <EducationalProgramsMonitoring />

            <ActivitiesSection />
        </main>
    );
}
