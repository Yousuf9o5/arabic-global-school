import { CertificateIcon, DocumentIcon, EducationalProgramsCircleIcon, PeopleGroupIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Section from "../ui/section";

export default function EducationalProgramsMonitoring() {
    const t = useTranslations("educational_programs.monitoring");

    const icons = [DocumentIcon, PeopleGroupIcon, CertificateIcon];
    const keys = ["reports", "meetings", "tools"];

    const items = keys.map((key, i) => ({
        title: t(`features.${key}.title`),
        desc: t(`features.${key}.desc`),
        icon: icons[i],
    }));

    return (
        <Section className="bg-[#FFFDC2]" size={"screen"}>
            <Section.Inner className="gap-8 max-w-[1220px]">
                <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 w-fit mb-4 mx-auto">
                    <EducationalProgramsCircleIcon />
                    <span>{t("enrichment")}</span>
                </div>

                <h1 className="section-header max-w-2xl text-center mx-auto">{t("title")}</h1>

                <div className="flex items-stretch flex-col-reverse lg:flex-row gap-8">
                    <div className="p-8 grid place-items-center">
                        <div className="bg-white p-4 relative h-fit overflow-hidden rounded-2xl">
                            <div className="educational-programs-activity-image overflow-hidden max-h-[550px]">
                                <Image
                                    width={432}
                                    height={503}
                                    src="/images/curricula/11. الصفحة الرابعة.jpeg"
                                    alt="Educational Programs Monitoring"
                                    className="object-cover transition-transform duration-300"
                                />
                            </div>
                            <Image
                                width={270}
                                height={180}
                                src="/svg/educational-programs-monitoring.svg"
                                alt="Educational Programs Monitoring"
                                className="absolute bottom-0 end-0 z-10"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 flex-1 space-y-4 py-8 lg:py-16">
                        {items.map(({ icon: Icon, title, desc }, index) => (
                            <article key={title + index} className="flex items-center gap-4 bg-white px-4 py-6 rounded-4xl flex-1">
                                <div className="rounded-3xl size-[56px] flex items-center justify-center flex-shrink-0">
                                    {Icon && <Icon className="w-8 h-8 text-primary" />}
                                </div>

                                <div className="">
                                    <h3 className="font-medium text-xl">{title}</h3>
                                    <p className="text-gray-600 mt-1">{desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </Section.Inner>
        </Section>
    );
}
