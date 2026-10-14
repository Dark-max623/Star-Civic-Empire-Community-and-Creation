# Star Civic Empire — Website Documentation

> **A luxury corporate website with an integrated admin portal.**
> Built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and Django REST Framework.

**Version:** 2.0
**Last Updated:** October 2026
**Status:** Production-ready v1

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Quick Start](#3-quick-start)
4. [Project Structure](#4-project-structure)
5. [Design System](#5-design-system)
6. [Public Website](#6-public-website)
7. [Admin Portal](#7-admin-portal)
8. [Authentication & Security](#8-authentication--security)
9. [Data Layer & State](#9-data-layer--state)
10. [Image Upload System](#10-image-upload-system)
11. [Pagination](#11-pagination)
12. [Reviews Moderation](#12-reviews-moderation)
13. [Events Management](#13-events-management)
14. [Services Management](#14-services-management)
15. [Contact Messages](#15-contact-messages)
16. [Newsletter Subscribers](#16-newsletter-subscribers)
17. [Routing Map](#17-routing-map)
18. [API Reference](#18-api-reference)
19. [Component Reference](#19-component-reference)
20. [TypeScript Interfaces](#20-typescript-interfaces)
21. [Local Storage Keys](#21-local-storage-keys)
22. [Audit Logging](#22-audit-logging)
23. [Deployment](#23-deployment)
24. [Troubleshooting](#24-troubleshooting)
25. [Future Enhancements](#25-future-enhancements)
26. [FAQ](#26-faq)

---

## 1. Project Overview

**Star Civic Empire** is a luxury conglomerate operating across four interconnected verticals:

| Vertical | Description |
|---|---|
| **Star Civic Events** | Concerts, weddings, corporate galas |
| **Star Civic Banquet** | Catering, venue hire, fine dining |
| **Star Civic Fashions** | Luxury apparel and textile collections |
| **Star Civic Foundation** | Philanthropy — education, healthcare, environment |

### Project Goals

- Present a **premium, dark-mode-first** corporate identity
- Provide a public marketing site with hero, services, gallery, reviews, events
- Include a full **admin portal** for non-technical staff to manage all content
- Persist data via **Django + PostgreSQL** (dev: SQLite)
- Be **type-safe, responsive, and animation-rich**

### Key Features

- Dark luxury aesthetic (`#161616` + gold `#FF8800`)
- Fully responsive — mobile, tablet, desktop
- Framer Motion page transitions and entrance animations
- **Admin-only login** with JWT authentication
- Account lockout after failed login attempts
- Password reset via email
- Image upload with EXIF stripping, dimension caps, and client-side compression
- **Pagination** on gallery, events, reviews, and messages
- **Audit logging** on every admin action
- Contact form, review submission, newsletter subscription
- **Content Security Policy** and full security headers

---

## 2. Tech Stack

### Frontend

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 18.2 |
| Language | TypeScript | 5.3 |
| Build Tool | Vite | 5.1 |
| Styling | Tailwind CSS | 3.4 |
| Animation | Framer Motion | 11.0 |
| Routing | React Router DOM | 6.22 |
| HTTP Client | Axios | latest |
| Fonts | Poppins (Google Fonts) | — |

### Backend

| Layer | Technology | Version |
|---|---|---|
| Framework | Django | 5.0 |
| API | Django REST Framework | 3.15 |
| Auth | djangorestframework-simplejwt | 5.3 |
| CORS | django-cors-headers | 4.3 |
| Filtering | django-filter | 24.1 |
| Env | django-environ | 0.11 |
| Images | Pillow | 10.2 |
| Server (prod) | Gunicorn | 21.2 |
| Static (prod) | WhiteNoise | 6.6 |
| Storage (prod) | django-storages + boto3 | — |
| Errors (prod) | Sentry SDK | 1.40 |
| Security | django-csp | 3.8 |

### Database

| Env | Backend |
|---|---|
| Development | SQLite (`db.sqlite3`) |
| Production | PostgreSQL |

---

## 3. Quick Start

### Prerequisites

- Node.js v18+
- Python 3.11+
- npm v9+ (or pnpm/yarn)

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
cp .env.example .env

python manage.py makemigrations
python manage.py migrate
python manage.py seed_data
python manage.py runserver 8000
```

Backend runs at **http://localhost:8000**.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:3000**.

### Admin Login

```
URL:      http://localhost:3000/login
Email:    bobmochama975@gmail.com
Password: (the one you set with createsuperuser)
```

---

## 4. Project Structure

```
star-civic-empire/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── .env
│   ├── .env.example
│   ├── config/
│   │   ├── settings/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── apps/
│   │   ├── core/          (base models, pagination, permissions, audit, middleware)
│   │   ├── accounts/      (CustomUser, JWT auth, password reset)
│   │   ├── gallery/       (GalleryImage model + CRUD)
│   │   ├── reviews/       (Review model + moderation)
│   │   ├── events/        (Event model + CRUD)
│   │   ├── services/      (Service model + CRUD)
│   │   ├── newsletter/    (Subscriber model)
│   │   └── contact/       (ContactMessage model)
│   ├── media/             (dev uploads)
│   └── static/
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    └── src/
        ├── api/           (axios client + endpoint wrappers)
        ├── admin/         (admin portal pages)
        ├── components/
        │   ├── layout/    (Header, Footer, Layout, PageTransition, ScrollToTop)
        │   ├── sections/  (Hero, Welcome, Gallery, Services, WhyUs, Journey, UpcomingEvents, Reviews)
        │   └── ui/        (Button, PageHero, ImageUploader, LoadMoreButton, etc.)
        ├── context/       (AuthContext, DataContext)
        ├── data/          (static seed data)
        ├── hooks/         (useScrollPosition)
        ├── pages/         (About, Services, Gallery, Events, Contact, ServiceDetail)
        ├── types/         (TypeScript interfaces)
        ├── utils/         (imageUpload)
        ├── assets/
        │   └── images/    (MR.T.jpg, STAR_CIVIC_LOGO.png, etc.)
        ├── styles/
        │   └── index.css
        ├── App.tsx
        └── main.tsx
```

---

## 5. Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `bg-dark` | `#161616` | Primary page background |
| `bg-dark-elevated` | `#1E1E1E` | Cards, elevated surfaces |
| `gold-primary` | `#FF8800` | Accents, CTAs, headers, active state |
| `gold-hover` | `#FFA733` | Button hover state |
| `text-primary` | `#FFFFFF` | Headings, primary copy |
| `text-subtle` | `#AAAAAA` | Body copy, subtitles |
| `text-muted` | `#666666` | Copyright, micro-copy |

### Typography

- **Font Family:** Poppins (weights 300–800)
- **Hero Title:** `text-3xl → text-7xl`, `font-extrabold`, `uppercase`
- **Section Title:** `text-3xl → text-5xl`, `font-bold`, `uppercase`
- **Subtitle:** `text-sm → text-base`, `font-medium`, `uppercase`, tracking-widest
- **Body:** `text-sm → text-base`, `font-light`

### Spacing

- Base unit: **8px**
- Section padding: `py-16 md:py-24 lg:py-28`
- Container: `max-w-7xl mx-auto px-6 md:px-10 lg:px-16`

### Breakpoints

| Prefix | Min Width | Target |
|---|---|---|
| `base` | 0px | Mobile |
| `sm` | 640px | Large mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

### Animations

- **Page transitions:** Framer Motion fade + slide (`AnimatePresence mode="wait"`)
- **Entrance:** `initial` + `whileInView` fade-up
- **Hover:** Scale 1.04 on buttons, image zoom 1.05 on cards
- **Active navlink:** animated gold underline, duration 0.3s
- **Global smooth scroll:** `html { scroll-behavior: smooth }`

---

## 6. Public Website

### Homepage (`/`)

Sections in order:

1. **Hero** — full-screen concert crowd, gradient overlay, animated title
2. **Welcome** — 2-col layout, company intro, values bullets, `MR.T.jpg` image
3. **Gallery** — masonry grid of photos, paginated
4. **Services** — 3-column grid of service cards (desktop)
5. **WhyUs** — 4 feature cards with orange headers
6. **Journey** — 2-col layout, CTA to events, Star Civic logo
7. **UpcomingEvents** — 5-column grid of event cards
8. **Reviews** — approved reviews grid + public submission form

### Standalone Pages

| Route | Purpose |
|---|---|
| `/about` | Full About Us page — Welcome + Values + Why Us |
| `/services` | All services grid |
| `/services/:slug` | Individual service detail |
| `/gallery` | Full paginated gallery |
| `/events` | Full paginated events list |
| `/contact` | Contact form + info cards |

### Navigation

Header navlinks point to routes (`/about`, `/services`, etc.) with:
- Active state in gold with animated underline
- Smooth page transitions via `AnimatePresence`
- Scroll to top on route change

---

## 7. Admin Portal

### Access

- **URL:** `http://localhost:3000/login`
- **Method:** email + password
- **Redirect on success:** `/admin/dashboard`

### Admin Pages

| Route | Page | Purpose |
|---|---|---|
| `/admin/dashboard` | Dashboard | Stats overview + quick actions |
| `/admin/gallery` | Gallery Manager | Upload/delete photos |
| `/admin/reviews` | Reviews & Comments | Approve/delete reviews |
| `/admin/events` | Events Manager | Publish/delete events |
| `/admin/services` | Services Manager | Add/delete service verticals |
| `/admin/messages` | Contact Messages | Read/reply/delete contact submissions |
| `/admin/subscribers` | Subscribers | View/remove newsletter emails |

### Sidebar

Fixed 256px width sidebar with 7 nav links. Main content scrolls independently — sidebar stays put. Layout is `h-screen` locked to prevent page-level scroll.

### Logout

Sidebar bottom → "Logout" button → clears session → returns to homepage.

---

## 8. Authentication & Security

### Authentication Flow

1. User submits email + password to `POST /api/auth/login/`
2. Backend validates credentials, checks role against `ALLOWED_LOGIN_ROLES`
3. On success: returns `{ access, refresh, user }`
4. Frontend stores both tokens in `localStorage`
5. Every API request attaches `Authorization: Bearer <access>`
6. On 401, frontend auto-refreshes via `POST /api/auth/refresh/`
7. Refresh tokens rotate on each use + are blacklisted

### Admin-Only Login

The constant `ALLOWED_LOGIN_ROLES = ('admin',)` in `settings/base.py` restricts login to admin accounts. Non-admin users (even if they exist in the database) receive "Invalid email or password" — indistinguishable from a wrong password.

### Account Lockout

- Tracked on `CustomUser.failed_login_attempts` and `locked_until`
- After **5 failed attempts**, account locks for **15 minutes**
- Successful login resets both counters
- Configurable via `MAX_LOGIN_ATTEMPTS` and `LOCKOUT_DURATION_MINUTES` env vars

### Password Reset

1. User clicks "Forgot password?" on login page
2. Submits email to `POST /api/auth/password-reset/`
3. Backend sends a tokenized link via email
4. Link points to `/reset-password/confirm?uid=...&token=...`
5. User sets new password → `POST /api/auth/password-reset/confirm/`
6. Redirect to login

### Security Headers (Production)

- `Content-Security-Policy` (via `django-csp`)
- `Permissions-Policy` — disables camera, mic, geolocation
- `Referrer-Policy` — `strict-origin-when-cross-origin`
- `X-Content-Type-Options` — `nosniff`
- `X-Frame-Options` — `DENY`
- HSTS — 1 year, include subdomains, preload
- `SECURE_SSL_REDIRECT` — force HTTPS

### Upload Safety

- **Max size:** 5MB
- **Allowed formats:** JPEG, PNG, WEBP, GIF
- **Dimension cap:** 4000×4000px
- **EXIF stripped** on every save (removes GPS, camera serial, timestamps)
- **Pillow verification** rejects corrupted files
- **UUID filenames** prevent enumeration

### Rate Limiting

| Scope | Limit |
|---|---|
| `anon` | 100/hour |
| `user` | 1000/hour |
| `login` | 10/minute |
| `review_submit` | 5/hour |
| `newsletter` | 3/hour |

### Audit Logging

Every write action logs to `AuditLog`:
- Who (user or anonymous)
- What (action: create, update, delete, login, login_failed)
- Target (model name + UUID)
- When (timestamp)
- Where (IP address, user agent)
- Context (JSON metadata)

Viewable in Django admin: `http://localhost:8000/admin/core/auditlog/`

---

## 9. Data Layer & State

### Two React Contexts

| Context | Responsibility |
|---|---|
| `AuthContext` | Admin session, login, logout, bootstrap |
| `DataContext` | Gallery, reviews, events, services + all CRUD methods |

### AuthContext API

```ts
{
  user: ApiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email, password) => Promise<{ ok, error? }>;
  logout: () => Promise<void>;
}
```

### DataContext API

```ts
{
  // Gallery
  gallery, galleryTotal, galleryHasMore, isLoadingGallery
  refreshGallery, loadMoreGallery, uploadGalleryImages, deleteGalleryImage

  // Reviews
  reviews, reviewsTotal, reviewsHasMore, isLoadingReviews
  refreshReviews, loadMoreReviews, approveReview, deleteReview
  publicReviews, refreshPublicReviews, submitReview

  // Events
  events, eventsTotal, eventsHasMore, isLoadingEvents
  refreshEvents, loadMoreEvents, createEvent, deleteEvent

  // Services
  services, isLoadingServices
  refreshServices, createService, deleteService
}
```

---

## 10. Image Upload System

### Flow

1. User selects file(s) via `ImageUploader`
2. Frontend validates file type + size
3. Multipart FormData POST to `/api/gallery/` or `/api/events/` or `/api/services/`
4. Backend validates with Pillow + EXIF strip
5. Django saves to `MEDIA_ROOT` with UUID filename
6. Response includes `image_url` (absolute)
7. DataContext prepends new item to state → public site updates instantly

### Upload Component

`ImageUploader` supports:
- Drag-and-drop
- Click to browse
- Multiple files (configurable max)
- Preview thumbnails
- File size validation (5MB default)

`SingleImageUploader` — variant for one-at-a-time uploads (used in Events and Services forms).

---

## 11. Pagination

Every list endpoint returns DRF paginated responses:

```json
{
  "count": 42,
  "next": "http://.../api/gallery/?page=2",
  "previous": null,
  "results": [ ... ]
}
```

### Page Sizes

| Resource | Per Page |
|---|---|
| Gallery | 12 |
| Events | 10 |
| Reviews | 15 |
| Messages | 15 |
| Subscribers | 20 |

### Client Behavior

Every list page (`/gallery`, `/events`, admin pages) shows a **Load More** button:

- "Showing 12 of 42 photos" counter
- Click Load More → fetches next page, appends to list
- When last page reached → button replaced with "— End of list —"

The `LoadMoreButton` component handles all states.

---

## 12. Reviews Moderation

### Public Submission

- Form on homepage `<Reviews />` section
- Also possible from any page with the section
- Rate limited to **5/hour per IP**
- Submitted reviews default to `status = 'pending'`
- Do not appear publicly until approved

### Admin Moderation (`/admin/reviews`)

- Filter tabs: All / Pending / Approved
- Each review card shows name, email, rating, status badge, message, date
- **Approve** — flips status to `approved`, immediately appears publicly
- **Delete** — permanently removes

---

## 13. Events Management

### Fields

| Field | Required | Notes |
|---|---|---|
| Title | ✅ | e.g. "The Weeknd UK Tour" |
| Date | ✅ | Free text, e.g. "15 Dec 2025" |
| Start Time | ✅ | HTML5 `type="time"` picker |
| End Time | ❌ | Optional |
| Location | ✅ | e.g. "The O2, London" |
| CTA Label | ❌ | Defaults to "Book Now" |
| Image | ✅ | Uploaded via `SingleImageUploader` |

### Public Display

- Homepage `<UpcomingEvents />` — 5-column grid
- Standalone page `/events` — paginated full grid
- Each card shows: poster, date, time range, location, title, CTA
- Poster area capped at `h-32 md:h-36` for uniform heights

---

## 14. Services Management

### The Four Verticals

1. **Star Civic Events** — events and concerts
2. **Star Civic Banquet** — venue and catering
3. **Star Civic Fashions** — luxury apparel
4. **Star Civic Foundation** — philanthropy

### Admin (`/admin/services`)

- Add new service: title, tagline, description, image, order, CTA label
- Delete existing services
- Slug auto-generated from title

### Public Display

- Homepage `<Services />` section — 3-column grid (`max-w-5xl`)
- Standalone page `/services`
- Detail page `/services/:slug` with full description + 2 CTAs

---

## 15. Contact Messages

### Public Submission

- Form at `/contact`
- Fields: name, email, subject, message
- POSTs to `/api/contact/`
- Rate limited via `newsletter` scope (3/hour)

### Admin Inbox (`/admin/messages`)

- Filter tabs: All / Unread / Read
- Expandable message cards
- Unread messages have gold border + dot indicator
- Actions: Reply by Email (mailto link), Mark as Read, Delete
- Paginated (15 per page)

### Dashboard Integration

Unread count appears as a stat card on `/admin/dashboard`.

---

## 16. Newsletter Subscribers

### Public Subscription

- Form in footer on every page
- POSTs to `/api/newsletter/subscribe/`
- Idempotent — subscribing twice doesn't error

### Admin View (`/admin/subscribers`)

- Table of emails + subscription dates
- **Export CSV** button
- Remove individual subscribers
- Paginated (20 per page)

---

## 17. Routing Map

### Public Routes

| Path | Component | Purpose |
|---|---|---|
| `/` | `PublicHome` | Homepage with all sections |
| `/about` | `AboutPage` | About Us |
| `/services` | `ServicesPage` | All services |
| `/services/:slug` | `ServiceDetailPage` | Individual service |
| `/gallery` | `PublicGalleryPage` | Full gallery |
| `/events` | `PublicEventsPage` | All events |
| `/contact` | `ContactPage` | Contact form |
| `/login` | `LoginPage` | Admin login |
| `/reset-password` | `PasswordResetRequestPage` | Request reset |
| `/reset-password/confirm` | `PasswordResetConfirmPage` | Set new password |

### Admin Routes (Protected)

| Path | Component |
|---|---|
| `/admin/dashboard` | `DashboardPage` |
| `/admin/gallery` | `GalleryPage` |
| `/admin/reviews` | `ReviewsPage` |
| `/admin/events` | `EventsPage` |
| `/admin/services` | `ServicesAdminPage` |
| `/admin/messages` | `MessagesPage` |
| `/admin/subscribers` | `SubscribersPage` |

### Redirects

- `/admin/login` → `/login`
- `*` (catch-all) → `/`

---

## 18. API Reference

### Auth

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/login/` | Public | Sign in |
| POST | `/api/auth/refresh/` | Public | Refresh access token |
| POST | `/api/auth/logout/` | Auth | Blacklist refresh |
| GET | `/api/auth/me/` | Auth | Current user |
| POST | `/api/auth/register/` | Admin | Create new admin |
| GET | `/api/auth/users/` | Admin | List all users |
| POST | `/api/auth/password-reset/` | Public | Request reset |
| POST | `/api/auth/password-reset/confirm/` | Public | Confirm reset |

### Gallery

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/gallery/` | Public | List paginated |
| POST | `/api/gallery/` | Admin | Upload photo |
| DELETE | `/api/gallery/:id/` | Admin | Delete photo |

### Reviews

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/reviews/` | Public | Approved only |
| POST | `/api/reviews/submit/` | Public | Submit new |
| GET | `/api/reviews/all/` | Admin | All reviews |
| PATCH | `/api/reviews/:id/approve/` | Admin | Approve |
| DELETE | `/api/reviews/:id/` | Admin | Delete |

### Events

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/events/` | Public | List paginated |
| POST | `/api/events/` | Admin | Create |
| DELETE | `/api/events/:id/` | Admin | Delete |

### Services

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/services/` | Public | List |
| POST | `/api/services/` | Admin | Create |
| PATCH | `/api/services/:slug/` | Admin | Update |
| DELETE | `/api/services/:slug/` | Admin | Delete |

### Contact

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/contact/` | Public | Submit message |
| GET | `/api/contact/messages/` | Admin | List messages |
| PATCH | `/api/contact/messages/:id/read/` | Admin | Mark read |
| DELETE | `/api/contact/messages/:id/` | Admin | Delete |

### Newsletter

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/newsletter/subscribe/` | Public | Subscribe |
| GET | `/api/newsletter/subscribers/` | Admin | List |
| DELETE | `/api/newsletter/subscribers/:id/` | Admin | Remove |

### Admin

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/api/admin/stats/` | Admin | Dashboard counts |

---

## 19. Component Reference

### Layout

| Component | Purpose |
|---|---|
| `Header` | Sticky nav, login/logout, mobile menu |
| `Footer` | 4-column layout, newsletter form |
| `Layout` | Wraps Header + main + Footer |
| `PageTransition` | Framer Motion fade wrapper |
| `ScrollToTop` | Resets scroll on route change |

### UI Primitives

| Component | Purpose |
|---|---|
| `Button` | Ghost/solid variants, supports `href`, `to`, or `onClick` |
| `SectionHeader` | Subtitle + title pair |
| `PageHero` | Page banner with breadcrumb |
| `ImageWithZoom` | Image with hover scale + `fit` prop |
| `ImageUploader` | Drag-drop multi-file uploader |
| `SingleImageUploader` | Single-file variant |
| `LoadMoreButton` | Paginated list control |
| `ValueItem` | Orange bullet line |
| `ServiceCard` | Homepage service card |
| `EventCard` | Homepage event card |
| `FeatureCard` | Why Us feature card |
| `NewsletterForm` | Footer subscription |

---

## 20. TypeScript Interfaces

Core types in `src/types/index.ts` and `src/api/types.ts`:

```ts
// Backend response shapes (snake_case)
interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  date_joined: string;
}

interface ApiGalleryImage {
  id: string;
  image_url: string;
  alt: string;
  order: number;
  created_at: string;
}

interface ApiEvent {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  image_url: string;
  cta_label: string;
  is_active: boolean;
  created_at: string;
}

interface ApiService {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image_url: string;
  cta_label: string;
  order: number;
  is_active: boolean;
}

interface ApiReview {
  id: string;
  name: string;
  message: string;
  rating: number;
  created_at: string;
}

interface ApiAdminReview extends ApiReview {
  email: string;
  status: 'pending' | 'approved';
  updated_at: string;
}

interface ApiContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface ApiSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface DashboardStats {
  gallery_count: number;
  reviews_total: number;
  reviews_pending: number;
  events_count: number;
  services_count: number;
  unread_messages: number;
  subscribers_count: number;
}
```

Frontend view models (camelCase) live in `src/types/index.ts` — `Event`, `Service`, `Review`, etc.

---

## 21. Local Storage Keys

| Key | Purpose |
|---|---|
| `sce_access_token` | JWT access token |
| `sce_refresh_token` | JWT refresh token |

Django session-based data (not in localStorage): everything else lives server-side in PostgreSQL/SQLite.

**Clear all** in DevTools console:

```js
['sce_access_token', 'sce_refresh_token'].forEach((k) => localStorage.removeItem(k));
location.reload();
```

---

## 22. Audit Logging

Every admin write action is recorded in `AuditLog`. View at:

```
http://localhost:8000/admin/core/auditlog/
```

Fields captured:
- `user` — the admin who performed the action (nullable for anonymous)
- `action` — `create` / `update` / `delete` / `login` / `login_failed`
- `target_model` + `target_id` — what was acted upon
- `metadata` — JSON (changed fields, notes)
- `ip_address` — XFF-aware
- `user_agent` — browser identifier
- `created_at` — timestamp

The admin panel is **read-only** — entries cannot be edited or deleted through the UI.

---

## 23. Deployment

### Backend (Render / Railway / Fly.io)

Environment variables to set:

```
DJANGO_SECRET_KEY=<generate with: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())">
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=api.starcivic.com
DJANGO_SETTINGS_MODULE=config.settings.production

DATABASE_URL=postgres://...
CORS_ALLOWED_ORIGINS=https://starcivic.com,https://www.starcivic.com
FRONTEND_URL=https://starcivic.com

JWT_ACCESS_LIFETIME_MINUTES=30
JWT_REFRESH_LIFETIME_DAYS=7

MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION_MINUTES=15

USE_S3=True
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_STORAGE_BUCKET_NAME=...
AWS_S3_REGION_NAME=eu-west-2

SENTRY_DSN=...
```

Start command:

```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

Pre-deploy:

```bash
python manage.py migrate
python manage.py collectstatic --no-input
```

### Frontend (Vercel / Netlify / Cloudflare Pages)

`.env.production`:

```
VITE_API_URL=https://api.starcivic.com/api
```

Build command: `npm run build`
Output directory: `dist`

### SPA Routing

Add a rewrite rule to serve `index.html` for all routes:

**Vercel** (`vercel.json`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** (`public/_redirects`):

```
/*    /index.html   200
```

### DNS

Point your domain at the frontend host. Point `api.` subdomain at the backend host.

---

## 24. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| **Login fails with correct credentials** | Account locked, or role not `admin` | Wait 15 min or `python manage.py shell` → `user.failed_login_attempts = 0; user.locked_until = None; user.save()` |
| **`Request was throttled`** | Hit login rate limit (10/min) | Restart Django, or loosen in `development.py` |
| **CORS error in browser** | Origin not in `CORS_ALLOWED_ORIGINS` | Add frontend URL to `.env` |
| **Images not loading** | MEDIA not served in dev | Verify `urls.py` has `static(settings.MEDIA_URL, ...)` under `if DEBUG` |
| **`no such column: accounts_customuser.X`** | Migration not run | `python manage.py makemigrations && python manage.py migrate` |
| **Blank screen after login** | JWT expired | Clear localStorage, re-login |
| **Upload fails with 413** | File exceeds `MAX_UPLOAD_SIZE_BYTES` | Compress the image or bump the limit |
| **`ModuleNotFoundError: No module named 'environ'`** | Missing dependency | `pip install -r requirements.txt` |
| **`TypeError: settings.INSTALLED_APPS is empty`** | Wrong settings module | Check `manage.py` → `DJANGO_SETTINGS_MODULE=config.settings.development` |
| **`Cannot find module './pages/X'`** | Missing file or wrong export name | Verify the file exists and exports the exact name `App.tsx` imports |

---

## 25. Future Enhancements

### Security

- [ ] Move JWTs to httpOnly cookies
- [ ] Add MFA for admin accounts
- [ ] Add CAPTCHA on public forms
- [ ] Set up centralized logging (Sentry is wired; add alerts)
- [ ] Automated daily database backups

### Content

- [ ] Blog / News section
- [ ] Newsletter double opt-in
- [ ] Contact auto-reply email
- [ ] Booking/inquiry form per event
- [ ] Testimonials carousel
- [ ] Multi-language (i18n)

### UX

- [ ] Gallery lightbox
- [ ] Skeleton loaders instead of "Loading…"
- [ ] Toast notifications
- [ ] Drag-and-drop reordering for gallery
- [ ] Admin dashboard charts

### Technical

- [ ] Backend unit tests (pytest)
- [ ] Frontend tests (Vitest + Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] PWA support (offline gallery)
- [ ] Analytics (GA4 or Plausible)

---

## 26. FAQ

**Who can log in?**
Only users with `role='admin'`. Editors and viewers are blocked at the login endpoint.

**How do I create a new admin?**
```bash
python manage.py shell
```
```python
from django.contrib.auth import get_user_model
User = get_user_model()
User.objects.create_superuser(email='new@starcivic.com', password='StrongPass123', name='New Admin', role='admin')
```

**How do I reset a forgotten password?**
Visit `/login` → click "Forgot password?" → enter email → check Django terminal (dev) or inbox (prod) for the reset link.

**How many photos can I upload?**
No hard cap on the backend. Pagination keeps the frontend fast. Storage grows with PostgreSQL + S3.

**Can I edit a service's slug?**
Slugs auto-generate from titles. To change, edit the title and re-save, or update the slug directly in Django admin.

**Is there a mobile app?**
Not yet. The site is fully responsive and works well on mobile browsers.

**What happens if I delete a gallery image?**
It's removed from the database and the file is deleted from storage. This is permanent.

**Where do contact messages go?**
Stored in the database, visible at `/admin/messages` and Django admin. No email notification yet — that's on the roadmap.

**Are uploaded images private?**
No — they're served publicly by design (gallery, service cards, event posters).

**Can I export subscribers?**
Yes — click "Export