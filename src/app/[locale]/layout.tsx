import { Locale } from "@/i18n/routing";
import { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";
import Providers from "../providers";

// Add generateMetadata function
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    return {
        title: t("title"),
        description: t("description"),
        keywords: t("keywords"),
        // Add other metadata as needed
        openGraph: {
            title: t("title"),
            description: t("description"),
            locale: locale,
        },
        twitter: {
            title: t("title"),
            description: t("description"),
        },
    };
}

function Layout({ children }: { children: React.ReactNode }) {
    const messages = useMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <Providers>{children}</Providers>
        </NextIntlClientProvider>
    );
}

export default Layout;
