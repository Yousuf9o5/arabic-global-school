"use client";

import Link from "next/link";
import AppImage from "./app-image";
import { useTranslations } from "next-intl";
import LangSwitcher from "./lang-switcher";
import { Button } from "./ui/button";
import { useNavbarToggler } from "@/hooks/use-navbar-toggler";
import { BurgerMenu, ChevronRightIcon } from "@/assets/icons";
import BergerMenu from "./berger-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

function Navbar() {
    const { toggle, isOpen, close } = useNavbarToggler();
    const t = useTranslations("navbar");
    const tHome = useTranslations("home");

    const curriculaItems = [
        { title: tHome("curricula.quran"), href: "/curricula/light-of-the-quran" },
        { title: tHome("curricula.montessori"), href: "/curricula/montessori-curriculum" },
        { title: tHome("curricula.cambridge"), href: "/curricula/cambridge-eyfs" },
        { title: tHome("curricula.ico"), href: "/curricula/ico" },
    ];

    return (
        <nav className="flex items-stretch justify-between p-4 w-full max-w-8xl mx-auto overflow-hidden bg-transparent">
            <aside className="border-border-primary border p-2 pe-4 hidden lg:flex items-center gap-4 rounded-full ">
                <div className="flex items-center gap-2">
                    <AppImage className="size-10" optimized width={200} height={200} src={"/images/logo-school.png"} />
                    <AppImage className="h-8" src={"/images/global-arabic-school.png"} />
                </div>

                <div className="flex items-center gap-8 px-10">
                    <Link href="/about-us" className="hover:text-primary transition-colors">
                        {t("navigation.about")}
                    </Link>
                    <Link href="/activities" className="hover:text-primary transition-colors">
                        {t("navigation.activities")}
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none">
                            {t("navigation.curricula")}
                            <ChevronRightIcon className="w-4 h-4 rotate-90" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-44 border-gray-100 shadow-lg rounded-lg p-2" align="start">
                            {curriculaItems.map((item) => (
                                <DropdownMenuItem key={item.title} asChild>
                                    <Link
                                        href={item.href}
                                        className="w-full px-3 py-2 text-sm text-natural-tertiary hover:bg-[#F2F6FC] hover:!text-natural-tertiary rounded-md transition-colors cursor-pointer"
                                    >
                                        {item.title}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/news" className="hover:text-primary transition-colors">
                        {t("navigation.news")}
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition-colors">
                        {t("navigation.contact")}
                    </Link>
                </div>
            </aside>

            <aside className="flex items-center gap-2">
                <LangSwitcher />

                <Button shadow="default" className="rounded-full py-3 px-6 h-12">
                    {t("registration")}
                </Button>
            </aside>

            <aside className="block lg:hidden">
                <button className="border border-border-primary rounded-2xl bg-white grid place-items-center size-12" onClick={toggle}>
                    <BurgerMenu />
                </button>
            </aside>

            {/* Mobile Burger Menu */}
            <BergerMenu isOpen={isOpen} onClose={close} />
        </nav>
    );
}

export default Navbar;
