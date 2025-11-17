import { useTranslations } from "next-intl";
import Image from "next/image";
import CustomLink from "../ui/Link";
import Section from "../ui/section";
import useTextDirection from "@/hooks/use-text-direction";
import { Link } from "@/i18n/routing";
import { Button } from "../ui/button";

export default function AboutUsHero() {
    const { locale } = useTextDirection();
    const t = useTranslations("about_us.hero");

    const stories = () => {
        switch (locale) {
            case "ar":
                return "الحكايات";
            case "en":
                return "Stories";
            case "id":
                return "Cerita";
            default:
                return "";
        }
    };

    return (
        <Section size={"screen"} className="relative">
            <Section.Inner className="flex items-center lg:flex-row *:flex-1">
                <div className="flex flex-col">
                    <div className="max-w-[600px] lg:max-w-none mx-auto lg:mx-0 text-center lg:text-start">
                        <h1
                            className="text-[32px] md:text-[40px] lg:text-[56px] font-normal leading-[100%]"
                            dangerouslySetInnerHTML={{ __html: t("title", { stories: `<strong>${stories()}</strong>` }) }}
                        ></h1>

                        <p className="mt-4 pe-0 lg:pe-16 text-content-natural-primary/50 text-lg">
                            {t("desc.part1")}
                            <br />
                            {t("desc.part2")}
                        </p>
                    </div>

                    <div className="lg:mt-12 flex items-center justify-center lg:justify-start gap-4 py-8">
                        <Button shadow={"default"} asChild className="w-[175px]">
                            <Link href="/registration">{t("button")}</Link>
                        </Button>
                    </div>
                </div>
                <div className="">
                    <Image
                        src={"/images/about-us/real-content/01. الصفحة الثانيه (من نحن) الصورة الاولى.jpeg"}
                        className="w-full rounded-[48px] min-h-[666px] object-cover object-center"
                        width={650}
                        height={666}
                        alt={t("title", { stories: stories() })}
                    />
                </div>
            </Section.Inner>

            <Image
                width={1920}
                height={95}
                src={"/svg/about-us/scalloped-divider.svg"}
                alt={"scalloped-divider"}
                className="w-full absolute bottom-0 left-0 translate-y-1/2"
            />
        </Section>
    );
}
