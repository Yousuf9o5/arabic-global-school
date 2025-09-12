import Section from "../ui/section";

export default function ContactHero() {
    return (
        <Section className="relative">
            <div className="absolute top-1/6 -translate-y-1/2 left-[-35%] md:left-[-10%] lg:left-0 w-[170%] md:w-[120%] lg:w-full flex items-center">
                <img src="/svg/hero/arrow-in-2.svg" className="me-auto rtl:-scale-x-100 translate-y-28 md:translate-y-0" alt="" />
                <img src="/svg/hero/arrow-in-1.svg" className="rtl:-scale-x-100 -translate-y-16 md:translate-y-0" alt="" />
            </div>
        </Section>
    );
}
