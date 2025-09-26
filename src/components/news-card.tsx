import { HappyCalenderIcon } from "@/assets/icons";
import { cn, formatDate } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";
import AppImage from "./app-image";

interface NewsCardProps {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    created_at?: string;
    className?: string;
    hideBadge?: boolean;
    calenderSectionClass?: string;
}

const defaultData = {
    id: "1",
    title: "Default News Title",
    description: "This is a default description for the news card. Replace it with actual content.",
    image: "/images/news/news-placeholder.png",
    imageAlt: "Default news image",
    date: new Date().toISOString(),
};

export default function NewsCard({
    title = defaultData.title,
    description = defaultData.description,
    image = defaultData.image,
    imageAlt = defaultData.imageAlt,
    created_at = defaultData.date,
    className,
    hideBadge = false,
    calenderSectionClass,
}: NewsCardProps) {
    const t = useTranslations();

    return (
        <article
            className={twMerge(
                "p-6 bg-white border-s-4 border-primary flex flex-col gap-6 relative transition-transform duration-300 h-[560px] group",
                className
            )}
        >
            <div>
                <AppImage
                    src={image}
                    alt={imageAlt}
                    width={500}
                    height={300}
                    className="w-full h-80 object-center object-cover"
                    optimized={true}
                    useProxy={true}
                    fallbackSrc="/images/news/news-placeholder.jpg"
                />
            </div>

            <div className="py-4">
                <h3 className="font-bold text-xl">{title}</h3>
                <p className="text-[#020409] group-hover:text-inherit font-extralight mt-2 line-clamp-2">{description}</p>
            </div>

            <div className={cn("flex items-center gap-2 text-sm font-medium text-primary", calenderSectionClass)}>
                <HappyCalenderIcon />
                <span>{formatDate(new Date(created_at), t)}</span>
            </div>

            {hideBadge ? null : <img src="/svg/news-card-bottom-icon.svg" className="absolute end-0 bottom-0 translate-4" alt="" />}
        </article>
    );
}
