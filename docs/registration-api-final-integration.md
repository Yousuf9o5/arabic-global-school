# Registration API Final Integration

**Date:** 2025-10-13  
**Status:** ✅ Complete

---

## Overview

Complete integration of the student registration form with the backend API, including proper image upload handling with the `/studentImage` endpoint and correct payload structure for registration submission.

---

## Changes Made

### 1. Registration Service Updates

**File:** `src/services/registration.service.ts`

#### Image Upload API Integration
- Updated to use `/studentImage` endpoint (not `/students/images`)
- Proper FormData structure:
  - `path` field contains the file
  - `type` field specifies image type (0-3)
  - Optional `student_id` field (omitted during registration)

#### Image Types Mapping
```typescript
0 = student_photo
1 = birth_certificate
2 = family_card
3 = parents_id
```

#### API Response
```typescript
{
  "item": {
    "id": "uuid",
    "type": "0",
    "path": "https://main-website-api.arabicglobalschool.com/student_images/xxx.png"
  }
}
```

#### New Functions
- `uploadRegistrationImage(file, type, studentId?)` - Upload single image
- `deleteRegistrationImage(imageId)` - Delete uploaded image for cleanup

---

### 2. Registration Types Updates

**File:** `src/types/registration.types.ts`

#### Updated ImageData Interface
```typescript
export interface ImageData {
    ids: string;      // Image UUID from upload response
    path: string;     // Full URL to the image
    type: string;     // Image type (0-3)
}
```

#### Key Changes
- Added `ids` field (required by API)
- All parent data fields are now required (not optional)
- `nationality`, `living_with`, `contact_time` are numbers
- `mobility`, `hearing`, `vision` in health are numbers

---

### 3. Validation Schema Updates

**File:** `src/validations/attachments.validation.ts`

#### New UploadedFile Interface
```typescript
export interface UploadedFile {
    id: string;           // Local temp ID
    file: File;           // Actual file object
    preview?: string;     // Object URL for preview
    type: string;         // Field name
    path?: string;        // API path after upload
}
```

#### Schema Structure
- Each field is an array of `UploadedFile` objects
- Supports multiple files per field
- Validates minimum 1 file required

---

### 4. Image Preview Component

**File:** `src/components/ui/image-preview-list.tsx` (NEW)

#### Features
- Beautiful card-based preview layout
- Image thumbnails with loading state
- PDF/document file icons
- File size display
- Upload status indicator (green dot when uploaded)
- Hover-to-show delete button
- Smooth transitions and animations

#### Visual Design
- 16x16 rounded preview boxes
- Gray border with primary hover effect
- Shadow on hover
- File info: name (truncated), size, status
- Remove button appears on hover

---

### 5. Form File Component Updates

**File:** `src/components/ui/form-file.tsx`

#### Integration with Preview List
- Uses new `ImagePreviewList` component
- Maintains array of `UploadedFile` objects
- Generates unique IDs for each file
- Creates preview URLs for images
- Proper cleanup of object URLs
- Supports both single and multiple files

---

### 6. Attachments Page Integration

**File:** `src/app/[locale]/(auth)/registration/form/attachments/page.tsx`

#### Image Type Mapping
```typescript
const IMAGE_TYPE_MAP = {
    studentPhotos: "0",      // student_photo
    birthCertificate: "1",   // birth_certificate
    familyCard: "2",         // family_card
    parentsId: "3",          // parents_id
};
```

#### Upload Flow
1. User selects files → Added to form state with previews
2. Form submission → Collect all files with their types
3. Upload each file individually to `/studentImage`
4. Collect upload responses (id, path, type)
5. On success: Update form to show uploaded status
6. On error: Cleanup all uploaded images
7. Build final payload with images array
8. Submit registration with images

#### Error Handling
- Automatic cleanup of uploaded images if any upload fails
- Toast notifications for upload progress
- Clear error messages
- Loading states during upload and submission

#### Payload Structure
```typescript
{
  student: { ... },
  mother: { ... },
  father: { ... },
  education: { ... },
  health: { ... },
  images: [
    { ids: "uuid", path: "url", type: "0" },
    { ids: "uuid", path: "url", type: "1" },
    // ...
  ]
}
```

---

### 7. Registration Mapper Updates

**File:** `src/lib/registration-mapper.ts`

#### Type Transformations
```typescript
// String → Boolean
gender: studentInfo.gender === "true"

// String → Number
nationality: parseInt(studentInfo.nationality) || 0
living_with: parseInt(studentInfo.living_with) || 0
contact_time: parseInt(familyInfo.mother.contact_time || "0") || 0
mobility: parseInt(educationHealth.health.mobility || "0") || 0
hearing: parseInt(educationHealth.health.hearing) || 0
vision: parseInt(educationHealth.health.vision) || 0

// Optional String with Defaults
religion: familyInfo.mother.religion || ""
specialization: familyInfo.mother.specialization || ""
emergency_phone: familyInfo.mother.emergency_phone || ""
```

---

## API Endpoint Details

### Image Upload Endpoint

**POST** `/studentImage`

**Content-Type:** `multipart/form-data`

**Body:**
```
path: File
type: "0" | "1" | "2" | "3"
student_id: string (optional)
```

**Response:**
```json
{
  "item": {
    "id": "uuid",
    "type": "0",
    "path": "https://main-website-api.arabicglobalschool.com/student_images/xxx.png"
  }
}
```

### Registration Submission Endpoint

**POST** `/students`

**Content-Type:** `application/json`

**Body:** See full payload structure in documentation

**Required Fields in Images:**
- `ids` - UUID from image upload
- `path` - Full URL to image
- `type` - Image type string

---

## Testing Checklist

### Image Upload
- [x] Single file upload works
- [x] Multiple files upload works
- [x] Preview displays correctly for images
- [x] PDF files show file icon
- [x] File size displays correctly
- [x] Remove button works
- [x] Upload progress shows
- [x] Error cleanup works

### Form Submission
- [x] All form data loads from localStorage
- [x] Images upload before submission
- [x] Upload failures trigger cleanup
- [x] Success clears localStorage
- [x] Error messages display correctly
- [x] Loading states work properly
- [x] Redirect to thank you page works

### Data Transformation
- [x] Student data transforms correctly
- [x] Mother data transforms correctly
- [x] Father data transforms correctly
- [x] Education data transforms correctly
- [x] Health data transforms correctly
- [x] Images array structured properly
- [x] All number fields convert from strings
- [x] Boolean gender field converts correctly

---

## Known Issues & Solutions

### Issue: API expects `ids` field
**Solution:** Added `ids` field to ImageData interface and attachments upload logic

### Issue: File preview component needed better UI
**Solution:** Created ImagePreviewList component with beautiful card layout

### Issue: Multiple files per field support
**Solution:** Updated validation schema and form-file component to handle arrays

### Issue: Upload error cleanup
**Solution:** Added deleteRegistrationImage function and cleanup logic

---

## File Upload UI Improvements

### Before
- Simple image grid with small thumbnails
- Basic remove button
- No upload status
- Limited file info

### After
- Card-based layout with hover effects
- Large, clear previews (16x16)
- Upload status indicator
- File name, size, and type display
- Smooth animations
- Better spacing and organization
- Hover-to-reveal delete button
- Loading states for images

---

## Environment Variables

Ensure `.env.local` has:
```env
NEXT_PUBLIC_API_URL=https://main-website-api.arabicglobalschool.com/api
```

---

## Future Enhancements

1. **Progress Bar**: Show individual file upload progress
2. **Drag & Drop**: Add drag-and-drop file selection
3. **Image Compression**: Compress images before upload
4. **Retry Logic**: Retry failed uploads automatically
5. **Batch Upload**: Upload multiple files in parallel
6. **Preview Modal**: Click to view full-size image preview
7. **File Validation**: Client-side file size and type validation
8. **Upload Queue**: Show queue of files being uploaded

---

## Summary

✅ **Complete API Integration**
- All endpoints correctly implemented
- Proper request/response handling
- Error handling and cleanup

✅ **Beautiful UI**
- Professional file preview component
- Clear upload status
- Smooth user experience

✅ **Type Safety**
- All TypeScript types updated
- No type errors
- Proper transformations

✅ **Robust Error Handling**
- Upload failures cleaned up
- Clear error messages
- Graceful degradation

---

## Related Documentation

- [Registration API Integration](./registration-api-integration.md) - Main integration guide
- [Registration Final Updates](./registration-final-updates.md) - Previous updates

---

**Integration Complete!** 🎉

All registration forms now properly integrate with the backend API, including:
- Student information submission
- Family information with nested mother/father data
- Education and health information
- Multiple file uploads with preview
- Proper error handling and user feedback
