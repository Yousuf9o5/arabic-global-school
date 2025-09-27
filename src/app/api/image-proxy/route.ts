import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const TIMEOUT_MS = 20000; // 20 seconds timeout
const ALLOWED_DOMAINS = ["main-website-api.arabicglobalschool.com"];

/**
 * Image proxy route handler.
 * Proxies images from allowed domains with timeout and caching.
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const imageUrl = searchParams.get("url");

        if (!imageUrl) {
            return new NextResponse("URL parameter is required", { status: 400 });
        }

        // Validate the domain
        const url = new URL(imageUrl);
        if (!ALLOWED_DOMAINS.includes(url.hostname)) {
            return new NextResponse("Domain not allowed", { status: 403 });
        }

        try {
            // Fetch the image using axios with timeout
            const response = await axios.get<ArrayBuffer>(imageUrl, {
                responseType: "arraybuffer",
                timeout: TIMEOUT_MS,
                headers: {
                    "User-Agent": "Next.js Image Proxy",
                },
            });

            const contentType = response.headers["content-type"] || "image/jpeg";
            const imageBuffer = response.data;

            return new NextResponse(imageBuffer, {
                headers: {
                    "Content-Type": contentType,
                    "Cache-Control": "public, max-age=86400, s-maxage=86400", // 24 hours cache
                    "Content-Length": imageBuffer.byteLength.toString(),
                },
            });
        } catch (fetchError: any) {
            if (axios.isAxiosError(fetchError) && fetchError.code === "ECONNABORTED") {
                console.error("Image fetch timeout:", imageUrl);
                return new NextResponse("Image fetch timeout", { status: 504 });
            }
            const status = fetchError.response?.status ?? 500;
            console.error("Image fetch error:", fetchError);
            return new NextResponse("Failed to fetch image", { status });
        }
    } catch (error) {
        console.error("Image proxy error:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
