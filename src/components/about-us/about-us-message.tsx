import Image from "next/image";
import Section from "../ui/section";
import AppImage from "../app-image";
import { useTranslations } from "next-intl";

export default function AboutUsMessage() {
    const t = useTranslations("about_us.message");

    return (
        <Section className="relative lg:min-h-[776px] -my-8 py-16 gap-14">
            <Image className="absolute inset-0 md:scale-x-100 w-full h-full pointer-events-none object-cover lg:object-fill object-center" width={1440} height={776} src={"/images/about-us/message/sheet.png"} alt={""} />

            <div className="flex items-stretch gap-4 relative z-10 w-full mx-auto px-4 md:px-24">
                <AppImage className="size-[72px]" optimized width={200} height={200} src={"/images/logo-school.png"} />

                <div className="flex flex-col justify-between">
                    <h3 className="font-bold text-[28px]">{t("title")}</h3>
                    <h4 className="text-lg text-content-natural-primary/50">{t("subtitle")}</h4>
                </div>
            </div>

            <p
                className="font-[400] text-xl md:text-2xl lg:text-[28px] leading-[120%] tracking-[0] relative z-10 mx-auto px-4 md:px-24"
                dangerouslySetInnerHTML={{ __html: t.raw("msg_content") }}
            ></p>

            <Image className="absolute hidden md:block end-8 bottom-8 lg:end-16 lg:bottom-16 size-24 lg:size-auto rtl:-scale-x-100" width={133} height={133} src={"/svg/red-abstract-blob.svg"} alt={""} />
        </Section>
    );
}
