# Registration Form Enum Updates

**Date:** 2025-10-24  
**Purpose:** Update registration form fields to use backend API enum values instead of free-text or boolean inputs, and fix validation schemas.

---

## Overview

The registration form has been updated to use standardized enum values for various fields to match the backend API expectations. This ensures data consistency and proper validation. Additionally, validation schemas have been updated to properly validate enum values and remove incorrectly placed fields.

---

## Validation Schema Updates

### Fixed Issues:

1. **Removed incorrect fields from `getStudentInfoSchema`:**
   - Removed `child_school` and `child_next_class` - these belong to the registration component, not student info
   - These fields are saved separately in localStorage under `class_info` key

2. **Updated enum field validation:**
   - Changed from `.string().min()` to `.enum()` for proper enum validation
   - Fields: `gender`, `nationality`, `living_with` (student info)
   - Fields: `monthly_income`, `contact_time` (family info)
   - Fields: `vision`, `hearing`, `mobility` (education-health)

3. **Default values:**
   - Enum fields now use `undefined` as default instead of empty string `""`
   - Prevents type errors and allows proper placeholder display

### Validation Files Updated:
- ✅ `src/validations/student-info.validation.ts`
- ✅ `src/validations/family-info.validation.ts`
- ✅ `src/validations/education-health.validation.ts`

---

## Updated Fields

### 1. Gender (Student Info)
**Field:** `gender`  
**Component:** `src/app/[locale]/(auth)/registration/form/student-info/page.tsx`  
**Change:** Converted from boolean to enum  

**Enum Values:**
- `0` => Male
- `1` => Female

**Previous:** `{ value: "true" }` / `{ value: "false" }`  
**Now:** `{ value: "0" }` / `{ value: "1" }`

---

### 2. Nationality (Student Info)
**Field:** `nationality`  
**Component:** `src/app/[locale]/(auth)/registration/form/student-info/page.tsx`  
**Change:** Converted from text input to select dropdown with enum values  

**Enum Values:**
- `0` => Indonesian Citizen
- `1` => Foreign National

**Previous:** Free text input  
**Now:** Select dropdown with 2 options

---

### 3. Living With (Student Info)
**Field:** `living_with`  
**Component:** `src/app/[locale]/(auth)/registration/form/student-info/page.tsx`  
**Change:** Converted from text input to select dropdown with enum values  

**Enum Values:**
- `0` => Biological Parents
- `1` => Guardian

**Previous:** Free text input  
**Now:** Select dropdown with 2 options

---

### 4. Monthly Income (Family Info - Both Parents)
**Fields:** `mother.monthly_income` / `father.monthly_income`  
**Component:** `src/app/[locale]/(auth)/registration/form/family-info/page.tsx`  
**Change:** Converted from number input to select dropdown with enum values  

**Enum Values:**
- `0` => < Rp 5,000,000
- `1` => > Rp 5,000,000
- `2` => > Rp 10,000,000
- `3` => > Rp 15,000,000

**Previous:** Number input (type="number")  
**Now:** Select dropdown with 4 income ranges

---

### 5. Contact Time (Family Info - Both Parents)
**Fields:** `mother.contact_time` / `father.contact_time`  
**Component:** `src/app/[locale]/(auth)/registration/form/family-info/page.tsx`  
**Change:** Converted from text input to select dropdown with enum values  

**Enum Values:**
- `0` => After 17:00
- `1` => After 13:30
- `2` => Every Day

**Previous:** Free text input  
**Now:** Select dropdown with 3 time options

---

### 6. Vision (Education & Health)
**Field:** `health.vision`  
**Component:** `src/app/[locale]/(auth)/registration/form/education-health/page.tsx`  
**Change:** Reduced options to match backend enum  

**Enum Values:**
- `0` => Wears Glasses
- `1` => Normal

**Previous:** 5 options (normal, glasses, contacts, low, other)  
**Now:** 2 options matching backend enum

---

### 7. Hearing (Education & Health)
**Field:** `health.hearing`  
**Component:** `src/app/[locale]/(auth)/registration/form/education-health/page.tsx`  
**Change:** Reduced options to match backend enum  

**Enum Values:**
- `0` => Normal
- `1` => Less responsive to sound

**Previous:** 5 options (normal, assistive, partial, support, other)  
**Now:** 2 options matching backend enum

---

### 8. Mobility (Education & Health)
**Field:** `health.mobility`  
**Component:** `src/app/[locale]/(auth)/registration/form/education-health/page.tsx`  
**Change:** Reduced options to match backend enum  

**Enum Values:**
- `0` => Normal
- `1` => Less control over movements

**Previous:** 5 options (normal, wheelchair, crutches, limited, other)  
**Now:** 2 options matching backend enum

---

## Locale File Updates

All three locale files have been updated with new translation keys:

### English (`locales/en.json`)
- Added: `indonesianCitizen`, `foreignNational`
- Added: `biologicalParents`, `guardian`
- Added: `after17`, `after1330`, `everyDay`
- Updated: All health option labels

### Arabic (`locales/ar.json`)
- Added: `indonesianCitizen` (مواطن إندونيسي), `foreignNational` (مواطن أجنبي)
- Added: `biologicalParents` (الوالدين البيولوجيين), `guardian` (الوصي)
- Added: `after17` (بعد 17:00), `after1330` (بعد 13:30), `everyDay` (كل يوم)
- Updated: All health option labels

### Indonesian (`locales/id.json`)
- Added: `indonesianCitizen` (Warga Negara Indonesia), `foreignNational` (Warga Negara Asing)
- Added: `biologicalParents` (Orang Tua Kandung), `guardian` (Wali)
- Added: `after17` (Setelah 17:00), `after1330` (Setelah 13:30), `everyDay` (Setiap Hari)
- Updated: All health option labels

---

## API Integration

These enum values are sent directly to the backend API during registration submission. The backend expects these specific integer values and will reject requests with invalid enum values.

**Endpoint:** `/api/registration`  
**Method:** POST  
**Payload:** All enum fields are submitted as string representations of integers ("0", "1", "2", "3")

---

## Testing Checklist

- [ ] Gender selection works for both values
- [ ] Nationality dropdown shows correct options
- [ ] Living situation dropdown shows correct options
- [ ] Monthly income shows all 4 ranges correctly
- [ ] Contact time shows all 3 options correctly
- [ ] Vision dropdown shows 2 options
- [ ] Hearing dropdown shows 2 options
- [ ] Mobility dropdown shows 2 options
- [ ] All translations display correctly in Arabic, English, and Indonesian
- [ ] Form submission sends correct enum values to API
- [ ] Form validation works for all enum fields

---

## Notes

1. **Data Type:** All enum values are stored as strings ("0", "1", etc.) to maintain consistency with the form handling system.

2. **Validation Fixed:** The validation schemas have been updated to:
   - Use `.enum()` instead of `.string()` for enum fields
   - Remove `child_school` and `child_next_class` from student info schema (these belong to registration component)
   - Accept `undefined` as default value for enum fields
   - Properly validate all enum values before submission

3. **Backwards Compatibility:** Old registration data with previous format (boolean gender, free-text fields) may need migration if accessing historical records.

4. **UI/UX:** All dropdowns use `FormSelect` component which provides consistent styling and behavior across the form.

---

## Related Files

### Components
- `src/app/[locale]/(auth)/registration/form/student-info/page.tsx`
- `src/app/[locale]/(auth)/registration/form/family-info/page.tsx`
- `src/app/[locale]/(auth)/registration/form/education-health/page.tsx`
- `src/components/registration/registration.tsx` (handles class selection)

### Validation Schemas
- `src/validations/student-info.validation.ts` ✅ Updated
- `src/validations/family-info.validation.ts` ✅ Updated
- `src/validations/education-health.validation.ts` ✅ Updated

### Locale Files
- `locales/en.json` ✅ Added validation keys
- `locales/ar.json` ✅ Added validation keys
- `locales/id.json` ✅ Added validation keys

### Shared Components
- `src/components/ui/form-select.tsx` (used for all dropdown fields)

---

## Future Considerations

1. Consider creating a centralized enum constants file (e.g., `src/enums/registration.enums.ts`) to avoid hardcoding values in components.

2. Add TypeScript type definitions for enum values to improve type safety.

3. Consider adding enum value descriptions in backend API documentation.

4. Monitor form analytics to ensure users can complete all enum-based fields without confusion.
