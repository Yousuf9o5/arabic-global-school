# Registration Form - Final Updates

**Updated:** 2025-01-XX

## Summary

This document outlines the final updates made to the registration form system, including toast localization, loading states, multi-image upload support, and image API integration.

---

## 1. Toast Localization

Added localized toast messages for all three languages (en, ar, id) to provide proper user feedback during registration submission.

### Toast Keys Added

**Path:** `locales/{en,ar,id}.json`

```json
"toast": {
    "registration_success": "...",
    "registration_error": "...",
    "complete_steps": "...",
    "submitting": "..."
}
```

**Usage:**
- `registration_success` - Shown when registration is submitted successfully
- `registration_error` - Shown when registration submission fails
- `complete_steps` - Shown when user tries to submit without completing previous steps
- `submitting` - Shown during the submission process

---

## 2. Submit Button with Loading State

Updated the submit button in the attachments page to show a loading indicator during submission.

**Changes:**
- Added `Loader2` icon from `lucide-react`
- Button displays spinner and "Submitting..." text when `mutation.isPending || isUploading`
- Button is disabled during upload and submission to prevent duplicate submissions

**Implementation:**
```tsx
<Button disabled={mutation.isPending || isUploading}>
    {mutation.isPending || isUploading ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {tToast("submitting")}
        </>
    ) : (
        tCommon("continue")
    )}
</Button>
```

---

## 3. Multi-Image Upload Support

Enhanced `FormFile` component to support multiple file uploads with image previews.

### Component Updates

**Path:** `src/components/ui/form-file.tsx`

**New Features:**
- `multiple` prop to enable multi-file selection
- Image preview grid for selected files
- Remove button (X icon) on hover to delete individual images
- Automatic FileList to File[] conversion
- Preview URL cleanup on file removal

**Props:**
```tsx
interface FormInputProps {
    multiple?: boolean; // New prop
    // ... other existing props
}
```

**Preview Grid:**
- 2-column grid layout
- Thumbnail images (h-24, object-cover, rounded-lg)
- Hover overlay with delete button
- Automatic URL revocation on removal

---

## 4. Image Upload API Integration

Implemented image upload functionality that uploads files one by one and stores returned paths.

### Service Layer

**Path:** `src/services/registration.service.ts`

**New Functions:**

```typescript
// Upload single image, returns path string
export async function uploadRegistrationImage(file: File): Promise<string>

// Upload multiple images sequentially
export async function uploadRegistrationImages(files: File[]): Promise<string[]>
```

**API Endpoint:**
- `POST /students/images`
- Sends `FormData` with `image` field
- Returns `{ path: string }`

### Submission Flow

**Path:** `src/app/[locale]/(auth)/registration/form/attachments/page.tsx`

**Process:**
1. User selects files (single or multiple)
2. On submit, all files are uploaded sequentially
3. API returns path for each uploaded file
4. Paths are stored in localStorage under `attachments` key
5. Paths are included in final registration payload
6. Registration is submitted with all data + attachment paths
7. localStorage is cleared on success

**State Management:**
- `isUploading` state tracks upload progress
- Button disabled during upload and submission
- Error handling with localized error messages

---

## 5. localStorage Integration for Attachments

File paths returned from the image API are stored in localStorage before final submission.

**Key:** `ags_attachments`

**Structure:**
```typescript
{
    imagePaths: string[] // Array of paths returned from API
}
```

**Usage:**
- Paths are stored after all images are uploaded successfully
- Paths are included in the final registration payload
- All registration data (including attachments) is cleared on successful submission

---

## File Changes Summary

### Modified Files:
1. `locales/en.json` - Added toast section with 4 keys
2. `locales/ar.json` - Added toast section with Arabic translations
3. `locales/id.json` - Added toast section with Indonesian translations
4. `src/components/ui/form-file.tsx` - Added multi-file support with previews
5. `src/app/[locale]/(auth)/registration/form/attachments/page.tsx` - Integrated upload API, loading states, toast messages
6. `src/services/registration.service.ts` - Added `uploadRegistrationImage` function

### Key Features:
- ✅ Localized toast messages for all languages
- ✅ Loading spinner with Loader2 icon
- ✅ Multi-image upload with previews
- ✅ Sequential image upload to API
- ✅ Path storage in localStorage
- ✅ Clean error handling
- ✅ Disabled state during uploads

---

## Testing Checklist

- [ ] Select single file for parentsId, birthCertificate, familyCard
- [ ] Select multiple files for studentPhotos
- [ ] Verify image previews appear correctly
- [ ] Test removing images using X button
- [ ] Submit form and verify loading spinner appears
- [ ] Verify images are uploaded sequentially
- [ ] Check localStorage contains uploaded paths
- [ ] Verify final payload includes attachment paths
- [ ] Test error handling when upload fails
- [ ] Verify toast messages in all three languages
- [ ] Confirm button is disabled during upload
- [ ] Test successful submission clears localStorage

---

## Notes

- All code follows the project's conventions (simple, clean, no complexity)
- Image uploads happen sequentially to avoid overwhelming the server
- Preview URLs are properly cleaned up to prevent memory leaks
- FormFile component is backward compatible (works with single files by default)
- All user feedback messages are properly localized
