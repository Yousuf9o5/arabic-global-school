import Image from "next/image";
import Section from "../ui/section";
import { useTranslations } from "next-intl";
import { ExitIcon, UserIcon, WebCamIcon } from "@/assets/icons";

export default function ActivitiesSafety() {
    const t = useTranslations("services.safety");

    const keys = ["supervision", "entry_exit", "cameras"];

    const icons = [UserIcon, ExitIcon, WebCamIcon];

    const items = keys.map((key) => ({
        title: t(`points.${key}`),
        icon: icons.shift(),
    }));

    return (
        <Section className="max-w-[1220px] flex-col-reverse lg:flex-row items-stretch gap-8 lg:gap-20">
            <div className="">
                <Image
                    width={432}
                    height={473}
                    src={"/images/activities/real-content/08. الصفحة الثالثة (الانشطه) الصورة الثامنه.jpeg"}
                    className="rounded-[48px] h-full object-cover object-center min-w-full lg:min-w-[432px]"
                    alt={t("title")}
                />
            </div>

            <div className="flex flex-col gap-4 mx-auto max-w-lg lg:max-w-none">
                <h1 className="section-header text-center lg:text-start">{t("title")}</h1>

                <p className="section-description text-center lg:text-start">{t("subtitle")}</p>

                <div className="mt-4 lg:mt-auto space-y-4">
                    {items.map(({ icon: Icon, title }, index) => (
                        <article key={title + index} className="flex items-center gap-4 bg-background-container p-2 rounded-full">
                            <div className="bg-primary rounded-3xl size-[56px] flex items-center justify-center flex-shrink-0">
                                {Icon && <Icon className="w-6 h-6 text-primary" />}
                            </div>
                            <h3 className="font-medium text-xl">{title}</h3>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
