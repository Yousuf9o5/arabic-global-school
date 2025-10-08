import { useTranslations } from "next-intl";

interface NoNewsDataProps {
    onReset?: () => void;
}

export default function NoNewsData({ onReset }: NoNewsDataProps) {
    const t = useTranslations("news.announcements");

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center space-y-4 max-w-md">
                {/* Icon or illustration */}
                <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-primary/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>

                {/* Message */}
                <h3 className="text-2xl font-bold text-gray-900">
                    {t("no_data.title")}
                </h3>
                <p className="text-gray-600">
                    {t("no_data.description")}
                </p>

                {/* Reset button */}
                {onReset && (
                    <button
                        onClick={onReset}
                        className="mt-4 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200 font-medium"
                    >
                        {t("no_data.reset_button")}
                    </button>
                )}
            </div>
        </div>
    );
}
