import { BlueCircleIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Section from "../ui/section";

export default function AboutUsMission() {
    const t = useTranslations("about_us.mission");

    return (
        <Section size={"screen"} className="bg-background-container">
            <Section.Inner className="flex items-stretch flex-col-reverse lg:flex-row *:flex-1 gap-y-8 max-w-[1115px]">
                {/* Large screen image */}
                <div className="hidden lg:block ">
                    <Image
                        src={"/images/about-us/mission/lg-image.png"}
                        className="w-full rounded-[48px] object-cover object-center h-full overflow-visible"
                        width={650}
                        height={600}
                        alt={t("title")}
                    />
                </div>
                {/* Medium screen image */}
                <div className="hidden md:block lg:hidden">
                    <Image
                        src={"/images/about-us/mission/md-image.png"}
                        className="w-full rounded-[32px] object-cover object-center"
                        width={500}
                        height={400}
                        alt={t("title")}
                    />
                </div>
                {/* Small screen image */}
                <div className="block md:hidden -mx-4">
                    <Image
                        src={"/images/about-us/mission/sm-image.png"}
                        className="w-full rounded-[24px] object-cover object-center"
                        width={350}
                        height={250}
                        alt={t("title")}
                    />
                </div>

                <div className="flex flex-col lg:ms-8 text-center lg:text-start">
                    <div
                        className="bg-white rounded-full px-4 py-2 flex items-center gap-2 w-fit mb-10 mx-auto lg:mx-0"
                        style={{ boxShadow: "0px 3px 28px 0px #0064E266" }}
                    >
                        <BlueCircleIcon />
                        <span>{t("top-title")}</span>
                    </div>

                    <h1 className="text-[32px] md:text-6xl lg:text-5xl font-bold leading-[100%] mb-12">{t("title")}</h1>

                    <p
                        className="mt-4 text-content-natural-primary/70 text-lg md:text-[24px] font-normal not-italic leading-[100%] tracking-[0]"
                        dangerouslySetInnerHTML={{ __html: t.raw("desc") }}
                    ></p>
                </div>
            </Section.Inner>
        </Section>
    );
}
