import { HappyCalenderIcon } from "@/assets/icons";
import Section from "../ui/section";
import { useTranslations } from "next-intl";
import CustomLink from "../ui/Link";
import Image from "next/image";

export default function NewsHero() {
    const t = useTranslations("news.hero");

    return (
        <Section className="flex-col lg:flex-row items-center gap-8 *:flex-1 gap">
            <div className="space-y-4 max-w-lg">
                <div className="bg-solid-light rounded-xl px-4 py-2 flex items-center gap-2 w-fit mb-4 mx-auto text-primary lg:mx-0">
                    <HappyCalenderIcon />
                    <span>2025/08/20</span>
                </div>

                <h1 className="section-header">{t("title")}</h1>

                <p className="section-description">{t("subtitle")}</p>

                <CustomLink size={"lg"} shadow="default" href={"/about"} className="text-natural-primary border rounded-full">
                    {t("button")}
                </CustomLink>
            </div>

            <div className="">
                <Image className="rounded-3xl w-full" width={772} height={442} src={"/images/news/news-hero/image.jpg"} alt={t("title")} />
            </div>
        </Section>
    );
}
