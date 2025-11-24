import { useTranslations } from "next-intl";
import Section from "../ui/section";
import Image from "next/image";
import { Button } from "../ui/button";

export default function HomeArtistic() {
    const t = useTranslations("home.artistic");

    return (
        <Section size="screen" className="bg-white">
            <Section.Inner className="space-y-16">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="">
                        <h1 className="section-header max-w-2xl">{t("title")}</h1>
                    </div>

                    <p className="section-description max-w-xl">{t("desc")}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <div className="space-y-6 relative px-16 py-20 order-2 lg:order-1">
                        <Image
                            src="/images/artistic/image.png"
                            alt={"Artistic background element"}
                            width={500}
                            height={300}
                            className="pointer-events-none absolute start-0 top-0 rtl:-scale-x-100"
                            priority
                        />

                        <h2 className="text-2xl md:text-3xl lg:text-[36px] relative z-10 max-w-sm">{t("art")}</h2>
                        <Button shadow="default" className="rounded-full px-6 py-3">
                            {t("explore")}
                        </Button>
                    </div>

                    <div className="order-1 lg:order-2 aspect-video">
                        <div className="relative w-full h-full rounded-[32px] overflow-hidden aspect-video">
                            <iframe
                                className="absolute inset-0 w-full h-full aspect-video"
                                src="https://www.youtube.com/embed/4fOG4AJ4Yuk?si=3pS9AArbGXzoZtrO"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </div>
                    </div>
                </div>
            </Section.Inner>
        </Section>
    );
}
