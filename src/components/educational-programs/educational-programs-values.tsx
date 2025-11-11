import { useTranslations } from "next-intl";
import Image from "next/image";
import CustomLink from "../ui/Link";
import Section from "../ui/section";

export default function EducationalProgramsValues() {
    const t = useTranslations("educational_programs.values");

    return (
        <Section className="max-w-[1220px] flex-col-reverse lg:flex-row items-center gap-8 lg:gap-20 pt-12">
            <div className="flex flex-col gap-4 flex-1">
                <h1 className="text-[32px] md:text-[40px] lg:text-[56px] font-bold leading-[100%]">{t("title")}</h1>

                <p className="mt-4 text-content-natural-primary/50">{t("subtitle")}</p>

                <div className="mt-8 lg:mt-16">
                    <CustomLink href="" shadow={"default"}>
                        {t("registration")}
                    </CustomLink>
                </div>
            </div>

            <div className="flex-1">
                <div className="rounded-4xl overflow-hidden h-fit max-h-[475px]">
                    <Image
                        width={432}
                        height={473}
                        src={"/images/curricula/11. الصفحة الرابعة.jpeg"}
                        className="h-full object-contain object-center size-full"
                        alt={t("title")}
                    />
                </div>
            </div>
        </Section>
    );
}
