import useTextDirection from "@/hooks/use-text-direction";
import "./globals.css";

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
    const { dir, locale } = useTextDirection();

    return (
        <html lang={locale} dir={dir}>
            <body className="w-full overflow-x-hidden">{children}</body>
        </html>
    );
}
