# News Detail Page Implementation

**Date:** 2025-01-08  
**Purpose:** Dynamic news article detail page with server-side data fetching, metadata generation, and skeleton loading states.

---

## Overview

This implementation provides a complete news detail page system that:
- Fetches individual news articles by ID
- Generates dynamic metadata for SEO
- Prefetches data for optimal performance
- Displays news details, images, and gallery
- Shows related news highlights

---

## API Changes

### 1. **Response Types** (`src/services/response.types.ts`)

Added new interfaces for news detail structure:

```typescript
// Single item response for detail pages
export interface ItemResponse<T = unknown> {
    item: T;
}

// News detail section
export interface NewsDetail {
    id: string;
    news_id: string;
    title: MultilingualText;
    description: MultilingualText;
    path: string | null;
}

// News additional images
export interface NewsImage {
    id: string;
    path: string; // Full URL
}

// Updated News interface with details and images
export interface News {
    // ... existing fields
    details?: NewsDetail[];
    images?: NewsImage[];
}
```

### 2. **API Service** (`src/services/api.service.ts`)

Fixed and updated `getNewsById`:

```typescript
static async getNewsById(id: string) {
    const response = await API.get<ItemResponse<News>>(`/news/${id}`);
    return response.data;
}
```

### 3. **API Keys** (`src/services/api-keys.ts`)

Added new key for news detail:

```typescript
static readonly NEWS_DETAIL_API_KEY = "news-detail";
```

---

## Components

### 1. **NewsDetails** (`src/components/news/news-details.tsx`)

Dynamic component that displays news article content:

**Features:**
- Fetches news by ID using React Query
- Displays hero section with title, description, date, and main image
- Renders dynamic detail sections with alternating left/right layout
- Shows image gallery with thumbnails
- Supports multilingual content

**Props:**
```typescript
interface NewsDetailsProps {
    id: string; // News ID to fetch
    className?: string; // Optional styling
}
```

**Usage:**
```tsx
<NewsDetails id="news-id-here" />
```

### 2. **NewsHighlight** (`src/components/news/news-highlight.tsx`)

Updated to fetch and display related news:

**Features:**
- Fetches latest news using React Query
- Shows skeleton loaders while loading
- Displays up to 6 news cards
- Supports multilingual content

### 3. **Prefetch Data** (`src/components/prefetch-data.tsx`)

Added `NewsDetailPrefetchData` wrapper:

```typescript
export async function NewsDetailPrefetchData({ children, id }: NewsDetailProps) {
    const queryClient = new QueryClient();

    // Prefetch news detail
    await queryClient.prefetchQuery({
        queryKey: [APIKeys.NEWS_DETAIL_API_KEY, id],
        queryFn: () => ApiService.getNewsById(id),
    });

    // Prefetch related news
    await queryClient.prefetchQuery({
        queryKey: [APIKeys.NEWS_API_KEY],
        queryFn: ApiService.getNews,
    });

    return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
```

---

## Page Implementation

### **News Detail Page** (`src/app/[locale]/(main)/news/[id]/page.tsx`)

Complete implementation with:

#### 1. **Dynamic Metadata Generation**

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id, locale } = await params;

    try {
        const data = await ApiService.getNewsById(id);
        const news = data.item;

        const title = news.title?.[locale as keyof typeof news.title] || "News";
        const description = news.description?.[locale as keyof typeof news.description] || "";

        return {
            title: title,
            description: description,
            openGraph: {
                title: title,
                description: description,
                images: news.image ? [{ url: news.image }] : [],
            },
        };
    } catch (error) {
        return {
            title: "News",
            description: "News article",
        };
    }
}
```

#### 2. **Server Component with Prefetch**

```typescript
export default async function NewsArticlePage({ params }: Props) {
    const { id } = await params;

    return (
        <main className="min-h-lvh w-full overflow-hidden">
            <NewsDetailPrefetchData id={id}>
                <NewsDetails id={id} />
                <NewsHighlight />
                <ContactSection />
            </NewsDetailPrefetchData>
        </main>
    );
}
```

---

## Data Flow

1. **Server Side (Page Load)**
   ```
   User visits /news/[id]
   ↓
   generateMetadata() fetches news data for SEO
   ↓
   NewsDetailPrefetchData prefetches:
     - News detail by ID
     - Related news list
   ↓
   HTML sent to client with hydrated data
   ```

2. **Client Side (After Hydration)**
   ```
   NewsDetails component reads from cache
   ↓
   Displays news content immediately (no loading state)
   ↓
   NewsHighlight displays related news
   ```

---

## API Response Structure

### News Detail Response

```json
{
    "item": {
        "id": "uuid",
        "title": { "en": "...", "ar": "...", "in": "..." },
        "description": { "en": "...", "ar": "...", "in": "..." },
        "image": "https://...",
        "category": {
            "value": 2,
            "label": { "ar": "جوائز", "id": "Hadiah", "en": "Prizes" }
        },
        "created_at": "2025-09-03T11:22:21.000000Z",
        "details": [
            {
                "id": "uuid",
                "title": { "en": "...", "ar": "...", "in": "..." },
                "description": { "en": "...", "ar": "...", "in": "..." },
                "path": "https://..." // or null
            }
        ],
        "images": [
            { "id": "uuid", "path": "https://..." }
        ]
    }
}
```

---

## UI Features

### 1. **Hero Section**
- Date badge with calendar icon
- Large title (56px)
- Description
- Full-width main image

### 2. **Detail Sections**
- Alternating left/right layout
- Title and description for each section
- Optional image for each detail
- Decorative arrows (SVG)

### 3. **Image Gallery**
- Large main image
- Up to 3 thumbnail images
- Counter badge for additional images (e.g., "13+")

### 4. **Related News Highlight**
- Shows 6 latest news articles
- Skeleton loaders during fetch
- Hover effects

---

## Performance Optimizations

1. **Server-Side Prefetch**: Data fetched before page render
2. **React Query Cache**: Prevents duplicate requests
3. **Skeleton Loaders**: Smooth loading experience
4. **Image Optimization**: Next.js Image component with proper sizing
5. **Metadata Generation**: SEO-friendly with OpenGraph tags

---

## Error Handling

- API errors return default metadata
- Missing images handled gracefully (optional rendering)
- Null detail paths skip image rendering
- Empty arrays handled with conditional rendering

---

## Localization

All text content supports three locales:
- **Arabic** (ar)
- **English** (en)
- **Indonesian** (in)

Content automatically switches based on current locale from URL params.

---

## Example URLs

```
/ar/news/31f71bb0-9909-405f-a2fe-40af3fc0778c  (Arabic)
/en/news/31f71bb0-9909-405f-a2fe-40af3fc0778c  (English)
/id/news/31f71bb0-9909-405f-a2fe-40af3fc0778c  (Indonesian)
```

---

## Notes

- All images use Next.js Image component for optimization
- Gallery supports any number of images (shows first 4 + counter)
- Detail sections alternate layout automatically (even/odd index)
- Component kept simple and readable as requested
- No complex state management - relies on React Query cache
