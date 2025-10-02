import { z } from "zod";

const normalizeFiles = (value: unknown): File[] => {
    if (!value) return [];

    if (Array.isArray(value)) {
        return value.filter((file): file is File => file instanceof File);
    }

    if (value instanceof FileList) {
        return Array.from(value);
    }

    return value instanceof File ? [value] : [];
};

const createFileField = (message: string) =>
    z
        .custom<File | File[] | FileList | null | undefined>((value) => normalizeFiles(value).length > 0, {
            message,
        })
        .transform((value) => normalizeFiles(value));

/**
 * Returns the attachment schema enforcing that each required document is provided before submission.
 * Normalizes uploaded files to a `File[]` array for downstream consumption.
 */
export function getAttachmentsSchema(t: (key: string) => string) {
    return z.object({
        parentsId: createFileField(t("parents_id_required")),
        birthCertificate: createFileField(t("birth_certificate_required")),
        studentPhotos: createFileField(t("student_photos_required")),
        familyCard: createFileField(t("family_card_required")),
    });
}

type AttachmentsSchema = ReturnType<typeof getAttachmentsSchema>;

export type AttachmentsFormValues = z.infer<AttachmentsSchema>;
export type AttachmentsFormInput = z.input<AttachmentsSchema>;
