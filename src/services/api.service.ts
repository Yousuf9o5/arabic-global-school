import { API } from "./api.base";
import { Faq, ItemResponse, News, RootResponse } from "./response.types";

export class ApiService {
    static async getFAQs() {
        const response = await API.get<RootResponse<Faq>>("/questions?is_visible=1");
        return response.data;
    }

    static async getFAQById(id: string) {
        const response = await API.get<RootResponse<Faq>>(`/questions/${id}?is_visible=1`);
        return response.data;
    }

    static async getNews() {
        const response = await API.get<RootResponse<News>>("/news?is_visible=1");
        return response.data;
    }

    static async getNewsWithParams({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> } = {}) {
        const response = await API.get<RootResponse<News>>("/news?=1", { params: { is_visible: 1, ...searchParams } });
        return response.data;
    }

    static async getNewsById(id: string) {
        const response = await API.get<ItemResponse<News>>(`/news/${id}`);
        return response.data;
    }
}
