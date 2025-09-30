import { useTranslations } from "next-intl";
import Section from "../ui/section";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function ContactHero() {
    const t = useTranslations("contact_us.hero");

    const contactInfoKeys = ["phone", "email", "hours"] as const;

    const svgs = ["/svg/contact/telephone.svg", "/svg/contact/email.svg", "/svg/contact/timer.svg"];

    const contactInfo = contactInfoKeys.map((key, index) => {
        const value =
            key === "phone" ? t(`contact_info.${key}.number`) : key === "email" ? t(`contact_info.${key}.address`) : t(`contact_info.${key}.time`);

        let href = "";
        if (key === "phone") {
            href = `tel:${value.replace(/\s+/g, "")}`;
        } else if (key === "email") {
            href = `mailto:${value}`;
        }

        return {
            key,
            svg: svgs[index],
            title: t(`contact_info.${key}.title`),
            subtitle: t(`contact_info.${key}.subtitle`),
            value,
            href,
        };
    });

    return (
        <Section className="relative overflow-visible">
            <div className="absolute top-16 lg:top-44 -translate-y-1/2 left-[-35%] md:left-[-10%] lg:left-0 w-[170%] md:w-[120%] lg:w-full flex items-center">
                <img src="/svg/hero/arrow-in-2.svg" className="me-auto rtl:-scale-x-100" alt="" />
                <img src="/svg/hero/arrow-in-1.svg" className="rtl:-scale-x-100" alt="" />
            </div>

            <div className="h-[70%] w-1/4 absolute bottom-0 end-1/6 bg-[#81FD6233] rotate-200 blur-3xl pointer-events-none"></div>
            <div className="h-[70%] w-1/4 absolute bottom-8 end-[30%] bg-[#0064E233] rotate-200 blur-3xl pointer-events-none"></div>

            <div className="h-[70%] w-1/4 absolute bottom-8 -start-[10%] bg-[#FD906266] rotate-200 blur-3xl pointer-events-none"></div>

            <div className="px-4 relative z-10 mb-12">
                <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[62px] md:leading-[100%] tracking-[-0.06em] text-center align-middle max-w-5xl mx-auto">
                    {t("title")}
                </h1>
                <h4 className="section-description text-content-natural-primary/50 text-center mt-4 max-w-3xl mx-auto">{t("subtitle")}</h4>
            </div>

            <div className="border-8 border-white px-4 relative z-10 rounded-[40px] flex flex-col md:flex-row items-center gap-8 p-4 lg:p-8">
                <div className="flex-1">
                    <Image
                        height={556}
                        width={746}
                        src={"/images/contact/hero/hero-image.jpg"}
                        alt={t("title")}
                        className="max-h-[556px] w-full object-cover rounded-[28px]"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {contactInfo.map((info) => (
                        <article className="flex items-center" key={info.key + "contact-info"}>
                            <div className="bg-white/60 rounded-xl md:rounded-3xl border border-white size-[80px] md:size-[130px] grid place-items-center">
                                <Image height={70} width={70} src={info.svg} alt={info.key} className="size-[50px] md:size-[70px]" />
                            </div>

                            <div className="px-4 flex flex-col justify-between py-3">
                                <h3 className="font-semibold text-content-natural-secondary text-lg md:text-2xl">{info.title}</h3>
                                <p className="text-[#6A81B0] max-w-[300px] text-xs md:text-base">{info.subtitle}</p>
                                <h3 className="font-semibold text-primary text-lg md:text-2xl underline">
                                    <Link href={info.href}>{info.value}</Link>
                                </h3>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
