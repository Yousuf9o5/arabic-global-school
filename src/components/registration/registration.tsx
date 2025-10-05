"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";
import { FormSelect } from "../ui/form-select";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getStudentClassInfo, StudentClassInfo } from "@/validations/student-info.validation";

export default function Registration() {
    const t = useTranslations("register");

    const form = useForm({
        resolver: zodResolver(getStudentClassInfo(t)),
        defaultValues: {
            child_school: "",
            child_next_class: "",
        },
    });

    const submit = (data: StudentClassInfo) => {
        console.log(data);
    };

    return (
        <article className="bg-[#F9F8F4] rounded-4xl mx-auto p-10 relative max-w-[700px] text-center flex flex-col items-center my-16">
            <Image
                src="/svg/registration/blue-ball.svg"
                alt="Registration"
                width={56}
                height={56}
                className="-mt-4 mx-auto absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4"
            />

            <h1 className="text-[40px] font-bold mt-6">{t("title")}</h1>

            <div className="mt-6 text-natural-tertiary md:text-lg">
                <p>{t("welcomeMessage")}</p>
                <p>{t("welcomeText")}</p>
                <p>{t("instructionText")}</p>
                <br />
                <p>{t("processText")}</p>
                <br />
                <p>{t("wishText")}</p>
                <br />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className="w-full">
                    <div className="bg-white rounded-[20px] h-32 w-full flex gap-2 text-start p-6 *:flex-1">
                        <FormSelect
                            label={t("schoolSelection")}
                            name="child_school"
                            options={[
                                { label: t("primarySchool"), value: "primary" },
                                { label: t("secondarySchool"), value: "secondary" },
                                { label: t("kindergarten"), value: "kindergarten" },
                            ]}
                        />
                        <FormSelect
                            label={t("classSelection")}
                            name="child_next_class"
                            options={[
                                { label: t("one"), value: "one" },
                                { label: t("two"), value: "two" },
                                { label: t("three"), value: "three" },
                                { label: t("four"), value: "four" },
                                { label: t("five"), value: "five" },
                                { label: t("six"), value: "six" },
                            ]}
                        />
                    </div>

                    <div className="mt-12 flex items-center *:flex-1 w-full gap-2">
                        <Button size="lg" variant="outline" className="rounded-full max-w-64" type="button">
                            {t("backToHome")}
                        </Button>

                        <Button size="lg" className="rounded-full">
                            {t("continue")}
                        </Button>
                    </div>
                </form>
            </Form>
        </article>
    );
}
