import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Providers from "../providers";
import TabletFooter from "@/components/tablet-footer";
import MobileFooter from "@/components/mobile-footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";

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

function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: Locale }> }) {
    const messages = useMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <Providers>
                <Navbar />
                {children}
                <Footer />
                <TabletFooter />
                <MobileFooter />
            </Providers>
        </NextIntlClientProvider>
    );
}

export default Layout;
