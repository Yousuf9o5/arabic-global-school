import { APIKeys } from "@/services/api-keys";
import { ApiService } from "@/services/api.service";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface Props {
    children: React.ReactNode;
}

async function PrefetchData({ children }: Props) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [APIKeys.FAQ_API_KEY],
        queryFn: ApiService.getFAQs,
    });

    await queryClient.prefetchQuery({
        queryKey: [APIKeys.NEWS_API_KEY],
        queryFn: ApiService.getNews,
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}

export default PrefetchData;
