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
                <div className="w-full space-y-6 text-center lg:text-start">
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-xl bg-solid-light px-4 py-2 text-primary lg:mx-0">
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

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16">
                <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-start">
                    <div className="mx-auto flex w-fit items-center gap-2 rounded-xl bg-solid-light px-4 py-2 text-primary lg:mx-0">
                        <HappyCalenderIcon />
                        <span>2025/08/20</span>
                    </div>

                    <h1 className="section-header text-balance">Students Celebrate Cultural Day with Colors, Music, and Unity</h1>

                    <p className="section-description text-balance">
                        A joyful day that brought our school community together to honor traditions and embrace diversity.
                    </p>

                    <p className="text-base leading-relaxed text-content-natural-primary/80">
                        Students, teachers, and families filled the campus with vibrant outfits, live performances, and storytelling corners that
                        showcased the rich heritage represented at our school.
                    </p>
                </div>

                <div className="w-full lg:w-1/2">
                    <Image
                        priority
                        className="h-full w-full rounded-3xl object-cover"
                        width={772}
                        height={442}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-hero/image.jpg"
                        alt="Students perform during Cultural Day celebrations"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row-reverse lg:items-center lg:gap-16">
                <div className="w-full space-y-5 lg:w-1/2">
                    <h2 className="text-3xl font-semibold text-content-natural-primary">Hands-on Workshops & Performances</h2>

                    <p className="text-base leading-relaxed text-content-natural-primary/80">
                        Classrooms transformed into cultural stations where students explored traditional crafts, music, and language through guided
                        activities led by their peers.
                    </p>

                    <ul className="list-disc space-y-2 ps-6 text-base leading-relaxed text-content-natural-primary/80">
                        <li>Interactive calligraphy, weaving, and percussion workshops.</li>
                        <li>Student-led musical performances celebrating regional rhythms.</li>
                        <li>Story corners that highlighted family histories and local legends.</li>
                    </ul>
                </div>

                <div className="w-full lg:w-1/2">
                    <Image
                        className="h-full w-full rounded-3xl object-cover"
                        width={772}
                        height={442}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.jpg"
                        alt="Students collaborate during a cultural craft workshop"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16">
                <div className="w-full space-y-5 lg:w-1/2">
                    <h2 className="text-3xl font-semibold text-content-natural-primary">Community Connections</h2>

                    <p className="text-base leading-relaxed text-content-natural-primary/80">
                        Families joined the celebration by sharing stories, regional dishes, and personal artifacts that deepened the sense of
                        belonging across our school community.
                    </p>

                    <p className="text-base leading-relaxed text-content-natural-primary/80">
                        The day closed with a gratitude circle where students reflected on the values of respect, empathy, and unity that the event
                        inspired.
                    </p>
                </div>

                <div className="w-full lg:w-1/2">
                    <Image
                        className="h-full w-full rounded-3xl object-cover"
                        width={772}
                        height={442}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        src="/images/news/news-placeholder.png"
                        alt="Families and students share regional dishes during the celebration"
                    />
                </div>
            </div>
        </Section>
    );
}
