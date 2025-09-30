import { RegistrationStepper } from "@/components/registration/registration-stepper";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex items-stretch h-screen *:flex-1">
            <RegistrationStepper />
            <div className="p-4">{children}</div>
        </main>
    );
}
