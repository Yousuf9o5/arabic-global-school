import { EmailIcon, EmailIcon2, FacebookIcon, InstagramIcon, LocationIcon, PhoneIcon, TwitterIcon, YouTubeIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import AppImage from "./app-image";
import { Link } from "@/i18n/routing";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

function TabletFooter() {
    const t = useTranslations("footer");

    const FOOTER_LINKS = {
        about: [
            { href: "/about", key: "who_we_are" },
            { href: "/about#what-sets-us-apart", key: "what_sets_us_apart" },
            { href: "/about#board-of-trustees", key: "board_of_trustees" },
        ],
        facilities: [
            { href: "/services#classrooms", key: "classrooms" },
            { href: "/services#playgrounds", key: "playgrounds" },
            { href: "/services#laboratories", key: "laboratories" },
            { href: "/services#library", key: "library" },
            { href: "/services#restrooms", key: "restrooms" },
            { href: "/services#transportation", key: "transportation_services" },
        ],
        curricula: [
            { href: "/curricula#preparatory", key: "preparatory" },
            { href: "/curricula#elementary", key: "elementary_stage" },
            { href: "/curricula#montessori", key: "montessori" },
            { href: "/curricula#light-of-statement", key: "light_of_the_statement" },
            { href: "/curricula#cambridge", key: "cambridge" },
            { href: "/curricula#trilingual", key: "trilingual_education" },
            { href: "/curricula#ico", key: "ico" },
            { href: "/curricula#merdeka", key: "merdeka_curriculum" },
        ],
    };

    const CONTACTS = [
        { icon: <PhoneIcon />, key: "contact.phone" },
        { icon: <EmailIcon />, key: "contact.email" },
        { icon: <LocationIcon />, key: "contact.address" },
    ];

    const SOCIAL_LINKS = [
        { href: "#", icon: <FacebookIcon />, hoverColor: "bg-blue-600" },
        { href: "#", icon: <InstagramIcon />, hoverColor: "bg-blue-600" },
        { href: "#", icon: <TwitterIcon />, hoverColor: "bg-blue-600" },
        { href: "#", icon: <YouTubeIcon />, hoverColor: "bg-red-600" },
    ];

    return (
        <footer className="bg-background-container pt-16 pb-6 w-full hidden md:block lg:hidden">
            <div className="space-y-4 px-4 md:px-8 max-w-8xl mx-auto">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-5 flex-2">
                        <div className="rounded-full w-fit" style={{ boxShadow: "0 0 24px 0 rgba(0, 100, 226, 0.40)" }}>
                            <AppImage optimized width={75} height={75} src={"/images/logo-school.png"} />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold md:max-w-sm">{t("slogan")}</h1>
                            <p className="text-[20px] max-w-full text-natural-tertiary font-normal font-sans leading-[130%] md:text-[22px] lg:text-[24px]">
                                {t("desc")}
                            </p>
                        </div>

                        <div className="mt-auto flex items-center gap-4">
                            {SOCIAL_LINKS.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    className="rounded-[20px] p-2 transition-colors bg-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {link.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 flex flex-col">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">{t("contact.title")}</h1>

                        <div className="space-y-3 flex flex-col">
                            {CONTACTS.map((contact) => (
                                <div className="flex items-center gap-3" key={contact.key + "contacts"}>
                                    {contact.icon}
                                    <span>{t(contact.key)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Accordion type="single" collapsible>
                    {Object.entries(FOOTER_LINKS).map(([key, val]) => (
                        <AccordionItem value={key} key={key}>
                            <AccordionTrigger className="text-lg">{t(`${key}.title`)}</AccordionTrigger>

                            <AccordionContent className="flex flex-col gap-2">
                                {val.map((link) => (
                                    <Link className="text-natural-tertiary font-normal leading-[140%]" href={link.href} key={link.href}>
                                        {t(`${key}.links.${link.key}`)}
                                    </Link>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">{t("newsletter.title")}</h1>

                    <div className="flex items-stretch gap-4">
                        <div className="bg-white flex items-center h-[52px] px-4 gap-4 rounded-full w-full">
                            <EmailIcon2 />
                            <input type="text" className="!outline-none !border-none flex-1" placeholder={t("newsletter.placeholder")} />
                        </div>

                        <Button shadow="default" className="rounded-full h-[unset] px-8">
                            {t("newsletter.button")}
                        </Button>
                    </div>
                </div>

                <p>{t("newsletter.privacy_text")}</p>

                {/* <div className="mt-12 text-[14px] text-center font-sf-pro font-normal leading-[140%]">{t("copyright")}</div> */}
            </div>
        </footer>
    );
}

export default TabletFooter;
