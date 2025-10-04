import { useMutation } from "@tanstack/react-query";
import { submitRegistration } from "@/services/registration.service";
import type { RegistrationPayload } from "@/types/registration.types";
import { clearRegistrationData } from "@/lib/local-storage";

interface UseRegistrationMutationOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

/**
 * React Query mutation hook for submitting registration
 */
export function useRegistrationMutation({ onSuccess, onError }: UseRegistrationMutationOptions = {}) {
    return useMutation({
        mutationFn: (data: RegistrationPayload) => submitRegistration(data),
        onSuccess: (data) => {
            // Clear localStorage after successful submission
            clearRegistrationData();
            onSuccess?.();
        },
        onError: (error: Error) => {
            console.error("Registration submission failed:", error);
            onError?.(error);
        },
    });
}
