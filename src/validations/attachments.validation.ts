import { z } from "zod";

export interface UploadedFile {
    id: string;
    file: File;
    preview?: string;
    type: string;
    path?: string;
    uploaded?: boolean; // Flag to track if file is already uploaded
    uploadedId?: string; // Store the server-side ID for uploaded files
}

const createFileField = (message: string) =>
    z
        .array(
            z.object({
                id: z.string(),
                file: z.instanceof(File),
                preview: z.string().optional(),
                type: z.string(),
                path: z.string().optional(),
                uploaded: z.boolean().optional(),
                uploadedId: z.string().optional(),
            })
        )
        .optional();

/**
 * Returns the attachment schema with all fields optional.
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
