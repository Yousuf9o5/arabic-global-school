import useTextDirection from "@/hooks/use-text-direction";
import localFont from "next/font/local";
import "./globals.css";

const sfProText = localFont({
    src: [
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Thin.otf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-ThinItalic.otf",
            weight: "100",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Ultralight.otf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-UltralightItalic.otf",
            weight: "200",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-LightItalic.otf",
            weight: "300",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-RegularItalic.otf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-MediumItalic.otf",
            weight: "500",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Semibold.otf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-SemiboldItalic.otf",
            weight: "600",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Bold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-BoldItalic.otf",
            weight: "700",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Heavy.otf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-HeavyItalic.otf",
            weight: "800",
            style: "italic",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-Black.otf",
            weight: "900",
            style: "normal",
        },
        {
            path: "../../public/fonts/SF Pro Display/SF-Pro-Text-BlackItalic.otf",
            weight: "900",
            style: "italic",
        },
    ],
    variable: "--font-sf-pro-text",
    display: "swap",
});

const sfArabicRounded = localFont({
    src: "../../public/fonts/SF-Arabic-Rounded/SF-Arabic-Rounded.ttf",
    variable: "--font-sf-arabic-rounded",
    weight: "100 900",
    display: "swap",
});

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
    const { dir, locale } = useTextDirection();

    return (
        <html lang={locale} dir={dir} className={`${sfProText.variable} ${sfArabicRounded.variable}`}>
            <body className="w-full overflow-x-hidden">{children}</body>
        </html>
    );
}
