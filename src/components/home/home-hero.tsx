import { useTranslations } from "next-intl";
import AppImage from "../app-image";
import CustomLink from "../ui/Link";
import Section from "../ui/section";

function HomeHero() {
    const t = useTranslations("home.hero");

    return (
        <Section className="relative overflow-hidden min-[400px]:px-0">
            <div
                className="absolute left-1/2 -translate-x-1/2 top-[14%] h-[350px] w-[500px] md:h-[550px] md:w-[800px] blur-[88px] rounded-full opacity-60"
                style={{ backgroundImage: "linear-gradient(180deg, #FFEA00 0%, rgba(255, 234, 0, 0) 75%)" }}
            ></div>

            <div className="absolute top-1/6 -translate-y-1/2 left-[-35%] md:left-[-10%] lg:left-0 w-[170%] md:w-[120%] lg:w-full flex items-center">
                <img src="/svg/hero/arrow-in-2.svg" className="me-auto rtl:-scale-x-100 translate-y-28 md:translate-y-0" alt="" />
                <img src="/svg/hero/arrow-in-1.svg" className="rtl:-scale-x-100 -translate-y-16 md:translate-y-0" alt="" />
            </div>

            <p className="bg-solid-light py-[6px] px-6 w-fit rounded-full text-natural-tertiary mx-auto text-xs md:text-base mb-6 md:mb-10 relative z-10">
                {t("paragraph")}
            </p>

            <div className="px-4 relative z-10">
                <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[62px] md:leading-[100%] tracking-[-0.06em] text-center align-middle">
                    {t("title")}
                </h1>
                <h2 className="sm:font-medium text-[32px] sm:text-[40px] md:text-[48px] lg:text-[62px] leading-[110%] tracking-[-0.06em] text-center align-middle">
                    {t("subtitle")}
                </h2>
            </div>

            <div
                className="px-6 py-3 flex items-stretch gap-4 w-fit rounded-full mx-auto translate-y-1/2 relative z-20"
                style={{ background: "linear-gradient(180deg, #FFFEED 0%, #FFFFFF 100%)" }}
            >
                <CustomLink shadow="default" href={"/about"} className="text-natural-primary px-8 py-2 border rounded-full">
                    {t("registration")}
                </CustomLink>
                <CustomLink href={"/contact"} shadow={"none"} variant={"outline"} className="text-natural-primary px-6 py-3 border rounded-full">
                    {t("discover")}
                </CustomLink>
            </div>
            <div className="w-full grid place-items-center mx-auto relative z-10">
                <AppImage
                    width={1800}
                    height={800}
                    className="w-full sm:rounded-[40px] max-h-[560px] object-cover"
                    optimized
                    src={"/images/hero-image.jpg"}
                    priority
                />
            </div>
        </Section>
    );
}

export default HomeHero;
