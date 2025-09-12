import { useTranslations } from "next-intl";
import Section from "../ui/section";
import CustomLink from "../ui/Link";

export default function ContactSection() {
    const t = useTranslations("contact");

    return (
        <div className="w-full">
            <Section size={"screen"} className="bg-white">
                <Section.Inner className="justify-center items-center min-h-[600px] relative !overflow-visible">
                    <img
                        src="/images/contact/md.png"
                        alt=""
                        className="absolute inset-0 w-full h-full scale-[1.35] object-cover md:hidden pointer-events-none"
                    />
                    <img
                        src="/images/contact/lg.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover scale-125 hidden md:block pointer-events-none"
                    />
                    <div className="relative z-10">
                        <div className="absolute left-0 top-0 size-full bg-white blur-xl pointer-events-none"></div>
                        <h1 className="section-header relative z-10 text-center">{t("title")}</h1>
                        <p className="section-description mt-4 max-w-xl text-center relative z-10">{t("desc")}</p>
                    </div>
                    <CustomLink shadow={"default"} href="" className="mt-16 w-[200px] py-4 rounded-full relative z-10">
                        {t("button")}
                    </CustomLink>
                </Section.Inner>
            </Section>
        </div>
    );
}
