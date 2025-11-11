import { useTranslations } from "next-intl";
import Image from "next/image";
import CustomLink from "../ui/Link";
import Section from "../ui/section";

export default function ActivitiesHero() {
    const t = useTranslations("services.hero");

    return (
        <Section className="flex lg:flex-row *:flex-1">
            <div className="flex flex-col">
                <div className="max-w-[600px] lg:max-w-none mx-auto lg:mx-0 text-center lg:text-start">
                    <h1 className="text-[32px] md:text-[40px] lg:text-[56px] font-bold leading-[100%]">{t("title")}</h1>
                    <p className="mt-4 pe-0 lg:pe-16 text-content-natural-primary/50">{t("subtitle")}</p>
                </div>

                <div className="mt-auto flex items-center justify-center lg:justify-start gap-4 py-4">
                    <CustomLink href="" shadow={"default"}>
                        {t("registration")}
                    </CustomLink>

                    <div className="flex flex-col">
                        <h4 className="font-bold">{t("counter")}</h4>
                        <span className="text-content-natural-primary/50">{t("counter_label")}</span>
                    </div>
                </div>
            </div>
            <div className="">
                <Image src={"/images/activities/real-content/01. الصفحة الثالثة الانشطة الصورة الاولى.jpeg"} className="w-full" width={650} height={650} alt={""} />
            </div>
        </Section>
    );
}
