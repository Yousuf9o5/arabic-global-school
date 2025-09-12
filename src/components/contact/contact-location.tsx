import { useTranslations } from "next-intl";
import Section from "../ui/section";

export default function ContactLocation() {
    const t = useTranslations("contact_us.location");

    return (
        <Section>
            <div className="text-center">
                <h1 className="section-header text-center mx-auto">{t("title")}</h1>
                <p className="text-content-natural-primary/50 text-center mx-auto max-w-[650px]">{t("subtitle")}</p>
            </div>

            <div className="">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106696.75899314378!2d44.273505468939824!3d33.31165885618622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9deda9d2a3b16f2c!2sBaghdad%2C%20Baghdad%20Governorate!5e0!3m2!1sen!2siq!4v1757686750490!5m2!1sen!2siq"
                    className="w-full h-[500px] rounded-[40px] mt-8"
                    style={{ border: "0" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </Section>
    );
}
