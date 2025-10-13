import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ThankYouPage() {
    const t = useTranslations("register.thankYou");

    return (
        <div className="flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-6 max-w-xl w-full">
                <Image src="/svg/registration/thank-you-illustration.svg" alt="Thank You" width={600} height={400} className="mx-auto my-8" />

                <div className="space-y-3">
                    <h1 className="font-bold text-[32px] [leading-trim:none] leading-none tracking-normal text-center">{t("title")}</h1>

                    <p className="text-center text-lg text-natural-tertiary mt-4 font-normal leading-none tracking-normal align-middle">
                        {t("message")}
                    </p>

                    <div className="mt-4 text-center">
                        <Button size={"lg"} asChild className="rounded-full w-full" shadow={"default"}>
                            <Link href="/">{t("returnHome")}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
