import { APIKeys } from "@/services/api-keys";
import { ApiService } from "@/services/api.service";
import { fetchHeroImage } from "@/services/images.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

export async function HomePrefetchData({ children }: Props) {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: ["heroImage"],
            queryFn: fetchHeroImage,
        }),
        queryClient.prefetchQuery({
            queryKey: [APIKeys.FAQ_API_KEY],
            queryFn: ApiService.getFAQs,
        }),
        queryClient.prefetchQuery({
            queryKey: [APIKeys.NEWS_API_KEY],
            queryFn: ApiService.getNews,
        }),
    ]);

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

interface NewsProps {
    searchParams: Record<string, string | string[] | undefined>;
    children: React.ReactNode;
}

export async function NewsPrefetchData({ children, searchParams }: NewsProps) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [APIKeys.NEWS_API_KEY, JSON.stringify(searchParams)],
        queryFn: () => ApiService.getNewsWithParams({ searchParams }),
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

interface NewsDetailProps {
    id: string;
    children: React.ReactNode;
    searchParams?: Record<string, string | string[] | undefined>;
}

export async function NewsDetailPrefetchData({ children, id, searchParams }: NewsDetailProps) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [APIKeys.NEWS_DETAIL_API_KEY, id],
        queryFn: () => ApiService.getNewsById(id),
    });

    await queryClient.prefetchQuery({
        queryKey: [APIKeys.NEWS_API_KEY, JSON.stringify(searchParams)],
        queryFn: () => ApiService.getNewsWithParams(searchParams),
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
