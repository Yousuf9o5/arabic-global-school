"use client";

import Image from "next/image";

import { HappyCalenderIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

import Section from "../ui/section";

/**
 * Presents the cultural day news story with a hero and two supporting highlights.
 * Each block pairs narrative copy with imagery inside a responsive, easy-to-edit layout.
 */

/** Props for the `NewsDetails` component. */
interface NewsDetailsProps {
    /** Optional classes to extend the root section wrapper. */
    className?: string;
}

export default function NewsDetails({ className }: NewsDetailsProps) {
    return (
        <Section className={cn("gap-16", className)}>
            <div className="flex flex-col gap-6 lg:items-center lg:gap-16">
                <div className="w-full space-y-6">
                    <div className="flex w-fit items-center gap-2 rounded-xl bg-solid-light px-4 py-2 text-primary">
                        <HappyCalenderIcon />
                        <span>2025/08/20</span>
                    </div>

                    <h1 className="section-header text-[56px] max-w-6xl">Students Celebrate Cultural Day with Colors, Music, and Unity</h1>

                    <p className="section-description text-balance">
                        A joyful day that brought our school community together to honor traditions and embrace diversity.
                    </p>
                </div>

                <div className="w-full">
                    <Image
                        priority
                        className="h-full w-full rounded-3xl object-cover max-h-[552px]"
                        width={772}
                        height={442}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-hero/image.jpg"
                        alt="Students perform during Cultural Day celebrations"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-32 relative">
                <div className="w-full space-y-6 text-center flex-1 lg:text-start max-w-xl me-auto relative">
                    <h1 className="section-header text-balance">A Day Full of Culture and Joy</h1>

                    <p className="md:text-[24px] leading-[100%] tracking-[0] text-content-natural-primary">
                        The Arab International School hosted its annual Cultural Day, an event that turned our campus into a vibrant showcase of
                        traditions, languages, and customs from around the world. Students came dressed in traditional attire, proudly representing
                        their heritage while learning about others.
                    </p>

                    <Image
                        className="absolute top-full start-[90%] hidden lg:block ltr:rotate-30 ltr:-scale-x-100"
                        width={200}
                        height={200}
                        src="/svg/hero/arrow-in-1.svg"
                        alt=""
                        aria-hidden="true"
                    />
                </div>

                <div className="w-full max-w-lg h-[400px]">
                    <Image
                        className="h-full w-full rounded-3xl object-cover"
                        width={500}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-hero/image.jpg"
                        alt="Students perform during Cultural Day celebrations"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-center lg:gap-32">
                <div className="w-full space-y-5 flex-1 max-w-xl ms-auto relative">
                    <h2 className="section-header text-content-natural-primary">Performances that Brought Stories to Life</h2>

                    <p className="md:text-[24px] leading-[100%] tracking-[0] text-content-natural-primary">
                        The school stage lit up with performances that included folk dances, poetry recitals, and short plays reflecting the values of
                        unity and respect. Parents and teachers were moved by the creativity and confidence shown by the students.
                    </p>

                    <Image
                        className="absolute top-full end-[95%] hidden lg:block ltr:-scale-x-100 ltr:-rotate-45"
                        width={200}
                        height={200}
                        src="/svg/hero/arrow-in-2.svg"
                        alt=""
                        aria-hidden="true"
                    />
                </div>

                <div className="w-full max-w-lg h-[400px]">
                    <Image
                        className="h-full w-full rounded-3xl object-cover"
                        width={500}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.jpg"
                        alt="Students collaborate during a cultural craft workshop"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-32">
                <div className="w-full space-y-5 flex-1 max-w-xl me-auto">
                    <h2 className="section-header text-content-natural-primary">Interactive Booths and Delicious Moments</h2>

                    <p className="md:text-[24px] leading-[100%] tracking-[0] text-content-natural-primary">
                        Classrooms were transformed into interactive booths, each themed around a different culture complete with music, decorations,
                        crafts, and traditional food. Students took pride in explaining their cultural backgrounds to visitors, sparking meaningful
                        conversations.
                    </p>
                </div>

                <div className="w-full max-w-lg h-[400px]">
                    <Image
                        className="h-full w-full rounded-3xl object-cover"
                        width={500}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.png"
                        alt="Families and students share regional dishes during the celebration"
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch gap-4">
                <div className="flex-1">
                    <Image
                        className="w-full rounded-3xl object-cover h-96 md:h-auto"
                        width={1048}
                        height={400}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.jpg"
                        alt="Students collaborate during a cultural craft workshop"
                    />
                </div>

                <div className="md:w-64 grid grid-cols-3 md:grid-cols-1 gap-6">
                    <Image
                        className="h-32 md:h-full rounded-xl md:rounded-3xl object-cover"
                        width={262}
                        height={200}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.jpg"
                        alt="Students collaborate during a cultural craft workshop"
                    />

                    <Image
                        className="h-32 md:h-full rounded-xl md:rounded-3xl object-cover"
                        width={262}
                        height={200}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.jpg"
                        alt="Students collaborate during a cultural craft workshop"
                    />

                    <div className="relative">
                        <div className="absolute inset-0 rounded-xl md:rounded-3xl bg-black/50 grid place-items-center text-4xl text-white">13+</div>

                        <Image
                            className="h-32 md:h-full rounded-xl md:rounded-3xl object-cover"
                            width={262}
                            height={200}
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            src="/images/news/news-placeholder.jpg"
                            alt="Students collaborate during a cultural craft workshop"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
