import { twMerge } from "tailwind-merge";

interface NewsCardSkeletonProps {
    className?: string;
    hideBadge?: boolean;
}

export default function NewsCardSkeleton({
    className,
    hideBadge = false,
}: NewsCardSkeletonProps) {
    return (
        <div
            className={twMerge(
                "p-6 bg-white border-s-4 border-primary flex flex-col gap-6 relative h-[560px] animate-pulse",
                className
            )}
        >
            {/* Image skeleton */}
            <div className="w-full h-80 bg-gray-200 rounded" />

            {/* Content skeleton */}
            <div className="py-4 space-y-3">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                
                {/* Description skeleton - 2 lines */}
                <div className="space-y-2 mt-2">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                </div>
            </div>

            {/* Calendar section skeleton */}
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-24" />
            </div>

            {/* Bottom badge */}
            {!hideBadge && (
                <div className="absolute end-0 bottom-0 w-16 h-16 bg-gray-200 rounded-tl-full" />
            )}
        </div>
    );
}
