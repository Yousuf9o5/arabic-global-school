# Registration API Integration Documentation

**Last Updated:** 2025-01-XX  
**Status:** ✅ Complete  
**Version:** 2.0

---

## Overview

This document describes the complete integration of the registration form system with the backend API. The registration flow has been refactored to match the API's structure with nested objects for family information (mother/father) and education/health data.

---

## Table of Contents

1. [API Structure](#api-structure)
2. [Form Validation Schemas](#form-validation-schemas)
3. [Form Components](#form-components)
4. [Data Transformation](#data-transformation)
5. [Internationalization](#internationalization)
6. [Field Mappings](#field-mappings)
7. [Type Transformations](#type-transformations)

---

## API Structure

### Request Body Format

The API expects a POST request to the registration endpoint with the following structure:

```json
{
  "student": {
    "child_school": 1,
    "child_next_class": "Grade 1",
    "full_name": "John Doe",
    "birth_place": "Baghdad",
    "family_name": "Doe",
    "religion": "Islam",
    "birthday": "2015-01-15",
    "age_in_july": 9,
    "id_passport_number": 123456789,
    "gender": true,
    "nationality": "Iraqi",
    "weight_height": "30kg/140cm",
    "sibling_order": 1,
    "home_language": "Arabic",
    "living_with": "Both parents"
  },
  "mother": {
    "full_name": "Jane Doe",
    "birthday": "1985-05-20",
    "age": 39,
    "religion": "Islam",
    "birth_place": "Baghdad",
    "nationality": "Iraqi",
    "registration_role": "Mother",
    "specialization": "Computer Science",
    "last_education": "Bachelor's Degree",
    "job_title": "Software Engineer",
    "job_type": "Full-time",
    "employer": "Tech Company",
    "employer_address": "123 Tech Street",
    "office_phone": "+964 123 456 789",
    "monthly_income": 5000,
    "email": "jane@example.com",
    "phone": "+964 770 123 4567",
    "emergency_phone": "+964 770 123 4568",
    "contact_time": "9 AM - 5 PM"
  },
  "father": {
    "full_name": "John Doe Sr.",
    "birthday": "1983-08-10",
    "age": 41,
    "religion": "Islam",
    "birth_place": "Baghdad",
    "nationality": "Iraqi",
    "registration_role": "Father",
    "specialization": "Civil Engineering",
    "last_education": "Master's Degree",
    "job_title": "Civil Engineer",
    "job_type": "Full-time",
    "employer": "Construction Co.",
    "employer_address": "456 Build Avenue",
    "office_phone": "+964 123 456 780",
    "monthly_income": 6000,
    "email": "john@example.com",
    "phone": "+964 770 987 6543",
    "emergency_phone": "+964 770 987 6544",
    "contact_time": "8 AM - 6 PM"
  },
  "education": {
    "previous_school": "Elementary School ABC",
    "school_address": "789 School Street",
    "specialization": "General Studies",
    "enrollment_year": 2020,
    "graduation_year": 2024
  },
  "health": {
    "medical_history": "No major conditions",
    "mobility": "normal",
    "hearing": "normal",
    "vision": "glasses",
    "future_ambition": "To become a doctor"
  }
}
```

### Key Characteristics

- **Nested Structure:** Data is organized into 5 main objects: `student`, `mother`, `father`, `education`, `health`
- **Type Requirements:**
  - Numbers: `age`, `monthly_income`, `age_in_july`, `id_passport_number`, `enrollment_year`, `graduation_year`, `child_school`, `sibling_order`
  - Boolean: `gender` (true = male, false = female)
  - Strings: Most other fields
  - Dates: ISO format strings (YYYY-MM-DD)

---

## Form Validation Schemas

### Student Information Schema

**File:** `src/validations/student-info.validation.ts`

```typescript
import { z } from "zod";

export const studentInfoSchema = z.object({
  child_school: z.string().refine((val) => val !== "0", {
    message: "Please select a school",
  }),
  child_next_class: z.string().min(1, "Next class is required"),
  full_name: z.string().min(1, "Full name is required"),
  birth_place: z.string().min(1, "Place of birth is required"),
  family_name: z.string().min(1, "Family name is required"),
  religion: z.string().optional(),
  birthday: z.string().min(1, "Date of birth is required"),
  age_in_july: z.string().min(1, "Age as of July is required"),
  id_passport_number: z.string().min(1, "ID/Passport number is required"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  weight_height: z.string().min(1, "Weight and height are required"),
  sibling_order: z.string().min(1, "Sibling order is required"),
  home_language: z.string().min(1, "Home language is required"),
  living_with: z.string().min(1, "Living arrangements are required"),
});

export type StudentInfoFormValues = z.infer<typeof studentInfoSchema>;
```

**Design Decision:** All numeric fields are validated as strings in the schema. This prevents Zod type inference issues with `z.coerce`. Transformation to numbers happens in the mapper layer.

---

### Family Information Schema

**File:** `src/validations/family-info.validation.ts`

```typescript
import { z } from "zod";

const parentSchema = () =>
  z.object({
    full_name: z.string().min(1, "Full name is required"),
    birthday: z.string().min(1, "Birthday is required"),
    age: z.string().min(1, "Age is required"),
    religion: z.string().min(1, "Religion is required"),
    birth_place: z.string().min(1, "Place of birth is required"),
    nationality: z.string().min(1, "Nationality is required"),
    registration_role: z.string().min(1, "Registration role is required"),
    specialization: z.string().min(1, "Specialization is required"),
    last_education: z.string().min(1, "Last education is required"),
    job_title: z.string().min(1, "Job title is required"),
    job_type: z.string().min(1, "Job type is required"),
    employer: z.string().min(1, "Employer is required"),
    employer_address: z.string().min(1, "Employer address is required"),
    office_phone: z.string().min(1, "Office phone is required"),
    monthly_income: z.string().optional(),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
    emergency_phone: z.string().min(1, "Emergency phone is required"),
    contact_time: z.string().min(1, "Contact time is required"),
  });

export const familyInfoSchema = z.object({
  mother: parentSchema(),
  father: parentSchema(),
});

export type FamilyInfoFormValues = z.infer<typeof familyInfoSchema>;
```

**Pattern:** Uses a factory function `parentSchema()` to create identical validation for both mother and father, ensuring consistency.

---

### Education & Health Schema

**File:** `src/validations/education-health.validation.ts`

```typescript
import { z } from "zod";

export const educationHealthSchema = z.object({
  education: z.object({
    previous_school: z.string().min(1, "Previous school is required"),
    school_address: z.string().min(1, "School address is required"),
    specialization: z.string().optional(),
    enrollment_year: z.string().regex(/^\d{4}$/, "Enter a valid year (e.g., 2020)"),
    graduation_year: z.string().regex(/^\d{4}$/, "Enter a valid year (e.g., 2024)"),
  }),
  health: z.object({
    medical_history: z.string().optional(),
    mobility: z.string().optional(),
    hearing: z.string().min(1, "Hearing condition is required"),
    vision: z.string().min(1, "Vision condition is required"),
    future_ambition: z.string().optional(),
  }),
});

export type EducationHealthFormValues = z.infer<typeof educationHealthSchema>;
```

**Features:**
- **Year Validation:** Regex pattern `/^\d{4}$/` ensures 4-digit years
- **Optional Fields:** `specialization`, `medical_history`, `mobility`, and `future_ambition` are optional
- **New Field:** `mobility` added to support accessibility tracking

---

## Form Components

### Student Information Page

**File:** `src/app/[locale]/(auth)/registration/form/student-info/page.tsx`

**Fields (15 total):**
1. `child_school` - Select dropdown
2. `child_next_class` - Text input
3. `full_name` - Text input
4. `birth_place` - Text input
5. `family_name` - Text input
6. `religion` - Text input (optional)
7. `birthday` - Date picker
8. `age_in_july` - Number input
9. `id_passport_number` - Text input
10. `gender` - Select (male/female)
11. `nationality` - Text input
12. `weight_height` - Text input
13. `sibling_order` - Text input
14. `home_language` - Text input
15. `living_with` - Text input

**Special Handling:**
- `gender`: Converted to boolean in mapper (male = true, female = false)
- `child_school`: Validated to not be "0" (placeholder value)

---

### Family Information Page

**File:** `src/app/[locale]/(auth)/registration/form/family-info/page.tsx`

**Structure:** Two sections with identical fields

#### Mother Section (19 fields)
#### Father Section (19 fields)

**Fields per parent:**
1. `full_name` - Text input
2. `birthday` - Date picker (FormDate component)
3. `age` - Number input
4. `religion` - Text input
5. `birth_place` - Text input
6. `nationality` - Text input
7. `registration_role` - Text input
8. `specialization` - Text input
9. `last_education` - Text input
10. `job_title` - Text input
11. `job_type` - Text input
12. `employer` - Text input
13. `employer_address` - Text input
14. `office_phone` - Text input
15. `monthly_income` - Number input (optional)
16. `email` - Email input
17. `phone` - Tel input
18. `emergency_phone` - Tel input
19. `contact_time` - Text input

**Implementation Pattern:**
```tsx
<FormInput
  name="mother.full_name"
  label={t("motherSection")}
  // ...
/>
```

The dot notation (`mother.full_name`) is handled by react-hook-form to access nested objects.

---

### Education & Health Page

**File:** `src/app/[locale]/(auth)/registration/form/education-health/page.tsx`

#### Education Section (5 fields)
1. `previous_school` - Text input
2. `school_address` - Text input
3. `specialization` - Text input (optional)
4. `enrollment_year` - Text input with year validation
5. `graduation_year` - Text input with year validation

#### Health Section (5 fields)
1. `medical_history` - Textarea (optional)
2. `mobility` - Select dropdown (NEW!)
3. `hearing` - Select dropdown
4. `vision` - Select dropdown
5. `future_ambition` - Text input (optional)

**Mobility Options:**
- `normal` - Normal mobility
- `wheelchair` - Uses wheelchair
- `crutches` - Uses crutches/walking aids
- `limited` - Limited mobility
- `other` - Other

---

## Data Transformation

### Mapper Function

**File:** `src/lib/registration-mapper.ts`

The `transformToApiPayload` function handles:

1. **Structure Transformation:** Converts flat form data to nested API structure
2. **Type Conversion:** Transforms string inputs to required number types
3. **Boolean Conversion:** Converts gender string to boolean
4. **Default Values:** Provides fallback values for optional fields

**Key Transformations:**

```typescript
// String to Number
age: parseInt(familyInfo.mother.age) || 0

// String to Number with fallback
monthly_income: parseInt(familyInfo.mother.monthly_income || "0") || 0

// String to Boolean
gender: studentInfo.gender === "male"

// Optional string handling
religion: studentInfo.religion || ""
future_ambition: educationHealth.health.future_ambition || ""
```

**Usage:**
```typescript
import { transformToApiPayload } from "@/lib/registration-mapper";

const apiPayload = transformToApiPayload(
  studentInfoData,
  familyInfoData,
  educationHealthData
);

await registrationService.submitRegistration(apiPayload);
```

---

## Internationalization

### Locale Files Updated

All three locale files have been updated with comprehensive translations:

1. **English:** `locales/en.json`
2. **Arabic:** `locales/ar.json`
3. **Indonesian:** `locales/id.json`

### Translation Structure

Each form section has its own namespace in the locale files:

```json
{
  "register": {
    "studentInformation": {
      "full_name": "Full name",
      "full_namePlaceholder": "Enter student's full name",
      // ... more fields
    },
    "familyInformation": {
      "motherSection": "Mother's Information",
      "fatherSection": "Father's Information",
      "full_name": "Full name",
      // ... more fields
    },
    "educationHealth": {
      "educationSection": "Education Information",
      "healthSection": "Health Information",
      "mobilityOptions": {
        "normal": "Normal mobility",
        "wheelchair": "Uses wheelchair",
        // ... more options
      }
    }
  }
}
```

### New Translations Added

**Section Labels:**
- `motherSection` - "Mother's Information"
- `fatherSection` - "Father's Information"
- `educationSection` - "Education Information"
- `healthSection` - "Health Information"

**New Fields:**
- `mobility` - Mobility condition
- `specialization` - Field of study/specialization (replaced `fieldOfStudy`)
- `futureAmbition` - Future ambition (replaced `futureAspiration`)
- 19 fields for each parent (mother/father)

**Mobility Options (5):**
All three locales include translations for:
- normal
- wheelchair
- crutches
- limited
- other

---

## Field Mappings

### Student Information Field Map

| Form Field | API Field | Type Transformation |
|------------|-----------|---------------------|
| `child_school` | `child_school` | string → number |
| `child_next_class` | `child_next_class` | string → string |
| `full_name` | `full_name` | string → string |
| `birth_place` | `birth_place` | string → string |
| `family_name` | `family_name` | string → string |
| `religion` | `religion` | string? → string (default: "") |
| `birthday` | `birthday` | string → string |
| `age_in_july` | `age_in_july` | string → number |
| `id_passport_number` | `id_passport_number` | string → number |
| `gender` | `gender` | string → boolean |
| `nationality` | `nationality` | string → string |
| `weight_height` | `weight_height` | string → string |
| `sibling_order` | `sibling_order` | string → number |
| `home_language` | `home_language` | string → string |
| `living_with` | `living_with` | string → string |

### Family Information Field Map

Each parent (mother/father) has identical fields:

| Form Field (nested) | API Field | Type Transformation |
|---------------------|-----------|---------------------|
| `mother.full_name` | `mother.full_name` | string → string |
| `mother.birthday` | `mother.birthday` | string → string |
| `mother.age` | `mother.age` | string → number |
| `mother.religion` | `mother.religion` | string → string |
| `mother.birth_place` | `mother.birth_place` | string → string |
| `mother.nationality` | `mother.nationality` | string → string |
| `mother.registration_role` | `mother.registration_role` | string → string |
| `mother.specialization` | `mother.specialization` | string → string |
| `mother.last_education` | `mother.last_education` | string → string |
| `mother.job_title` | `mother.job_title` | string → string |
| `mother.job_type` | `mother.job_type` | string → string |
| `mother.employer` | `mother.employer` | string → string |
| `mother.employer_address` | `mother.employer_address` | string → string |
| `mother.office_phone` | `mother.office_phone` | string → string |
| `mother.monthly_income` | `mother.monthly_income` | string? → number (default: 0) |
| `mother.email` | `mother.email` | string → string |
| `mother.phone` | `mother.phone` | string → string |
| `mother.emergency_phone` | `mother.emergency_phone` | string → string |
| `mother.contact_time` | `mother.contact_time` | string → string |

*Same structure applies for `father.*` fields*

### Education & Health Field Map

| Form Field (nested) | API Field | Type Transformation |
|---------------------|-----------|---------------------|
| `education.previous_school` | `education.previous_school` | string → string |
| `education.school_address` | `education.school_address` | string → string |
| `education.specialization` | `education.specialization` | string? → string |
| `education.enrollment_year` | `education.enrollment_year` | string → number |
| `education.graduation_year` | `education.graduation_year` | string → number |
| `health.medical_history` | `health.medical_history` | string? → string |
| `health.mobility` | `health.mobility` | string? → string |
| `health.hearing` | `health.hearing` | string → string |
| `health.vision` | `health.vision` | string → string |
| `health.future_ambition` | `health.future_ambition` | string? → string (default: "") |

---

## Type Transformations

### String to Number Conversions

The mapper performs several string-to-number transformations:

```typescript
// Simple conversion with fallback to 0
parseInt(value) || 0

// Conversion with optional handling
parseInt(value || "0") || 0
```

**Fields requiring number conversion:**
- `child_school`
- `age_in_july`
- `id_passport_number`
- `sibling_order`
- `mother.age`, `father.age`
- `mother.monthly_income`, `father.monthly_income`
- `enrollment_year`
- `graduation_year`

### String to Boolean Conversion

```typescript
gender: studentInfo.gender === "male"
```

**Logic:**
- Input: "male" | "female" (from select dropdown)
- Output: true (male) | false (female)

### Optional Field Handling

```typescript
// For optional strings
religion: studentInfo.religion || ""
future_ambition: educationHealth.health.future_ambition || ""

// For optional numbers
monthly_income: parseInt(familyInfo.mother.monthly_income || "0") || 0
```

### Date Handling

Dates are kept as ISO strings (YYYY-MM-DD):
- Form input: Date picker returns ISO string
- API expects: ISO string
- No transformation needed

---

## Testing Checklist

### Validation Testing
- [ ] Test all required fields show error when empty
- [ ] Test email validation works
- [ ] Test year fields only accept 4-digit numbers
- [ ] Test `child_school` rejects "0" value
- [ ] Test optional fields work without errors

### Type Transformation Testing
- [ ] Verify numeric fields convert correctly
- [ ] Verify gender boolean conversion
- [ ] Verify optional field defaults
- [ ] Test empty/undefined edge cases

### Integration Testing
- [ ] Test complete form submission flow
- [ ] Verify API payload structure matches docs
- [ ] Test form persistence with localStorage
- [ ] Test multi-step navigation preserves data

### Internationalization Testing
- [ ] Verify all labels appear in English
- [ ] Verify all labels appear in Arabic (RTL)
- [ ] Verify all labels appear in Indonesian
- [ ] Test form validation messages in all locales

---

## Migration Notes

### Breaking Changes from Previous Version

1. **Field Name Changes:**
   - `fullName` → `full_name` (snake_case)
   - `placeOfBirth` → `birth_place`
   - `ageAsOfJuly` → `age_in_july`
   - All other fields converted to snake_case

2. **Structure Changes:**
   - Family info split into `mother` and `father` objects
   - Education and health split into `education` and `health` objects
   - Each parent now has 19 individual fields

3. **Validation Changes:**
   - Removed `z.coerce` for type safety
   - All numeric fields validated as strings
   - Transformation moved to mapper layer

4. **New Fields:**
   - `mobility` field added to health section
   - Separate fields for mother and father (no longer shared)
   - `specialization` replaces `fieldOfStudy`
   - `futureAmbition` replaces `futureAspiration`

### Data Migration

If you have existing localStorage data, you'll need to migrate it:

```typescript
// Old structure
{
  motherName: "Jane Doe",
  fatherName: "John Doe"
}

// New structure
{
  mother: {
    full_name: "Jane Doe",
    // ... 18 more fields
  },
  father: {
    full_name: "John Doe",
    // ... 18 more fields
  }
}
```

---

## Troubleshooting

### Common Issues

**Issue:** Form validation errors on numbers
- **Cause:** Zod expecting number but receiving string
- **Solution:** Ensure validation schema uses `z.string()`, not `z.number()`

**Issue:** TypeScript errors in mapper
- **Cause:** Type mismatch between form values and API payload
- **Solution:** Add proper type transformations with `parseInt()` or default values

**Issue:** Optional fields causing errors
- **Cause:** Undefined values not handled
- **Solution:** Use `|| ""` or `|| 0` for fallback values

**Issue:** Nested field values not saving
- **Cause:** react-hook-form not recognizing dot notation
- **Solution:** Ensure defaultValues has proper nested structure in form initialization

---

## Future Improvements

1. **Validation Enhancement:**
   - Add phone number format validation
   - Add date range validation (e.g., age must be reasonable)
   - Add cross-field validation (e.g., graduation year > enrollment year)

2. **UX Improvements:**
   - Add auto-calculation for age based on birthday
   - Add address autocomplete
   - Add file upload for documents

3. **Performance:**
   - Consider form field lazy loading
   - Optimize validation debouncing
   - Implement progressive form saving

4. **Accessibility:**
   - Add ARIA labels for all fields
   - Improve error announcement for screen readers
   - Add keyboard navigation shortcuts

---

## Related Files

### Core Files
- `src/validations/student-info.validation.ts`
- `src/validations/family-info.validation.ts`
- `src/validations/education-health.validation.ts`
- `src/lib/registration-mapper.ts`
- `src/types/registration.types.ts`

### Component Files
- `src/app/[locale]/(auth)/registration/form/student-info/page.tsx`
- `src/app/[locale]/(auth)/registration/form/family-info/page.tsx`
- `src/app/[locale]/(auth)/registration/form/education-health/page.tsx`

### Locale Files
- `locales/en.json`
- `locales/ar.json`
- `locales/id.json`

### Service Files
- `src/services/registration.service.ts`
- `src/hooks/use-registration-mutation.ts`

---

## Support

For questions or issues related to this integration:
1. Check the validation schema matches your form structure
2. Verify the mapper transformations are correct
3. Test with the API directly using the example payload
4. Review TypeScript errors carefully for type mismatches

---

**Document Version:** 2.0  
**Last Reviewed:** 2025-01-XX  
**Next Review:** On API changes or major form updates
