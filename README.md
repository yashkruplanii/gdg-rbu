# GDG RBU — Event Management Platform 🚀

> **Official Full-Stack Event Management & Registration Platform for Google Developer Groups (GDG) on Campus — Ramdeobaba University (RBU).**  
> Built for the **GDG RBU Recruitment Drive 2026-27**.

![GDG RBU](https://img.shields.io/badge/GDG%20RBU-Campus%20Platform-4285F4?style=for-the-badge&logo=google)
![Next.js 14](https://img.shields.io/badge/Next.js%2014-App%20Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Neo--Brutalist-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)

---

## 📑 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Bonus Features Implemented](#-bonus-features-implemented)
- [Tech Stack](#️-tech-stack)
- [Getting Started Locally](#-getting-started-locally)
- [Demo Credentials](#-demo-credentials)
- [REST API Reference](#-rest-api-reference)
- [Deployment Guide (Vercel)](#-deployment-guide-vercel)
- [Project Structure](#-project-structure)
- [Architecture & Design Decisions](#-architecture--design-decisions)
- [Submission & Credits](#-submission--credits)

---

## 🎯 Project Overview

This platform is a bespoke, full-stack event management and attendee ticketing system tailored specifically for **GDG on Campus — Ramdeobaba University**. It adopts a bold **Neo-Brutalist design language** inspired by the official Figma design system, featuring Google brand primary colors (`#4285F4`, `#EA4335`, `#FBBC05`, `#34A853`), thick 2px borders, hard drop shadows, and modern micro-interactions.

Beyond frontend aesthetics, the application is backed by a production-ready **Next.js 14 App Router** architecture with database-level race condition protection, JWT authentication via HTTP-only cookies, capacity tracking, and digital QR ticket passes with print/download support.

---

## 🌟 Key Features

### 🎨 1. Neo-Brutalist UI / UX
- **Pixel-Accurate Branding**: Handcrafted vector Google Developer Groups logo, Google color accents, retro header fonts, and tactile button feedback (`active:translate-x-0.5`).
- **Dark / Light Theme Toggle**: Persistent theme switching with zero layout shift or flash of unstyled content.
- **Fully Responsive**: Crafted with mobile-first Tailwind utility classes, tested across mobile, tablet, and desktop viewports.
- **Micro-Interactions**: Real-time canvas confetti bursts upon registration, animated drawer/modal dialogues, and filter pills.

### ⚙️ 2. Robust Backend & Data Integrity
- **Capacity Management**: Real-time seat calculation prevents overbooking; registration automatically locks once capacity is exhausted.
- **Duplicate Prevention**: Multi-layered duplicate protection with relational database unique composite constraints (`@@unique([userId, eventId])`).
- **Secure Authentication**: Role-based access control (Student vs. Admin Lead) with `bcryptjs` password hashing and stateless JWT session cookies.
- **Attendee Ticket Generation**: Instant scannable QR ticket passes uniquely keyed to each registration.

### 🛡️ 3. Admin Management
- **Full CRUD for Events**: Create, edit, publish, and delete events directly through the web portal.
- **Live Attendee Tracking**: Real-time attendee roster inspection, filterable by event, with live occupancy progress bars.

---

## 🎁 Bonus Features Implemented

1. **Strict TypeScript**: Complete type coverage across database models, Next.js route contexts, and client components.
2. **Next.js 14 App Router**: Server Components, React Server Actions, and unified Route Handlers for optimal speed and SEO.
3. **Printable & Downloadable QR Passes**: Custom modal with `@media print` CSS optimization for physical badge printing and Canvas PNG image export.
4. **Interactive GDG Team Page**: Dedicated showcase of official GDG RBU community leads with direct social links.
5. **GDG Photo Gallery**: Visual history of flagship events (*Google I/O Extended, Android DevFest, Solution Challenge*).
6. **Built-in Seeding Engine**: One-command database seed populated with authentic GDG RBU events and team profiles.

---

## 🏗️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) + Custom Neo-Brutalist Theme |
| **Database & ORM** | [Prisma ORM](https://www.prisma.io/) (SQLite for local dev, PostgreSQL for production) |
| **Authentication** | `jose` & `jsonwebtoken` (Stateless JWT in HTTP-Only Cookies) + `bcryptjs` |
| **Icons & Assets** | [Lucide React](https://lucide.dev/) |
| **Ticketing Engine** | `qrcode.react` (SVG / Canvas rendering) |
| **Animations** | `canvas-confetti` |

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.17.0 or higher)
- `npm` or `yarn` or `pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/yashkruplanii/gdg-rbu.git
cd gdg-rbu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (or copy from `.env.example`):
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="gdg_rbu_super_secret_jwt_key_2026_change_in_prod"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Push Database Schema & Seed Data
```bash
# Push schema to SQLite
npx prisma db push

# Seed initial events, admin, and test users
npm run prisma:seed
```

### 5. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the platform.

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin Lead** | `admin@gdgrbu.com` | `admin123` | Full admin privileges (Create/Edit/Delete events, View all attendees) |
| **Student Member** | `yash@rbu.edu` | `password123` | Event browsing, one-click registration, digital QR ticket pass access |

*(You can also freely register any new account using the on-screen Register modal!)*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate & set secure session cookie | Public |
| `POST` | `/api/auth/logout` | Terminate session & clear cookies | Authenticated |
| `GET` | `/api/auth/me` | Retrieve active user session profile | Authenticated |
| `GET` | `/api/events` | List all events with search (`?q=`) & category filters | Public |
| `GET` | `/api/events/:id` | Fetch specific event details & attendee count | Public |
| `POST` | `/api/events` | Create a new event | **Admin Only** |
| `PUT` | `/api/events/:id` | Update an existing event | **Admin Only** |
| `DELETE`| `/api/events/:id` | Delete an event and registrations | **Admin Only** |
| `POST` | `/api/events/:id/register` | Register for an event (capacity & duplicate check) | Authenticated |
| `DELETE`| `/api/events/:id/register` | Cancel registration / free up seat | Authenticated |
| `GET` | `/api/registrations/my` | Get current user's registered tickets | Authenticated |
| `GET` | `/api/admin/registrations`| Query all registered passes across events | **Admin Only** |
| `GET` | `/api/admin/analytics` | Retrieve metrics and occupancy rates | **Admin Only** |

---

## 🌐 Deployment Guide (Vercel)

This application is ready for 1-click deployment on [Vercel](https://vercel.com):

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete GDG RBU event management platform"
   git remote add origin https://github.com/yashkruplanii/gdg-rbu.git
   git branch -M main
   git push -u origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your GitHub repository `gdg-rbu`.
3. **Configure Environment Variables in Vercel**:
   - `DATABASE_URL`: Your production database URL (e.g. free PostgreSQL on [Neon.tech](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres]).
   - `AUTH_SECRET`: Any random 32+ character secret string.
   - `NEXT_PUBLIC_APP_URL`: Your Vercel deployment URL (e.g., `https://gdg-rbu.vercel.app`).
4. **Deploy**:
   - Click **Deploy**. Vercel will automatically build and deploy your project with serverless Route Handlers.

---

## 📁 Project Structure

```
gdg-rbu/
├── app/
│   ├── api/                    # Next.js Route Handlers (REST Endpoints)
│   │   ├── admin/              # Admin-only endpoints (analytics, roster)
│   │   ├── auth/               # Login, register, logout, me
│   │   ├── events/             # Events CRUD & registration handlers
│   │   └── registrations/      # User tickets & passes
│   ├── events/                 # Events listing & search page
│   ├── team/                   # Official GDG RBU Team showcase page
│   ├── gallery/                # Flagship event photo gallery
│   ├── faq/                    # Frequently asked questions & support
│   ├── layout.tsx              # Root layout with theme provider & navbar
│   └── page.tsx                # Hero homepage with neo-brutalist styling
├── components/                 # Reusable UI components
│   ├── AuthModal.tsx           # Login / Register neo-brutalist dialog
│   ├── EventCard.tsx           # Event cards with tags & capacity counters
│   ├── Footer.tsx              # Clean chapter footer
│   ├── GdgLogo.tsx             # Vector SVG Google Developer Groups logo
│   ├── Navbar.tsx              # Sticky header with navigation pills & auth
│   ├── QRPassModal.tsx         # Printable & downloadable QR ticket badge
│   └── ThemeToggle.tsx         # Light/Dark mode switch
├── lib/                        # Backend utilities
│   ├── auth.ts                 # JWT signing, cookie verification & hashing
│   └── prisma.ts               # Singleton Prisma client instance
├── prisma/
│   ├── schema.prisma           # Relational schema (User, Event, Registration)
│   └── seed.js                 # Seeding script with authentic GDG data
└── public/                     # Static assets & event photos
```

---

## 🧠 Architecture & Design Decisions

### 1. Unified Full-Stack with Next.js 14 App Router
Instead of splitting the codebase into disparate client and server repositories, Next.js 14 provides:
- Co-located API Route Handlers running in secure Node.js execution environments.
- Server-side rendering for optimal First Contentful Paint (FCP) and SEO.
- Zero CORS complexity and shared TypeScript models between frontend and backend.

### 2. High-Concurrency Duplicate & Capacity Defense
- Race conditions during peak registration windows are mitigated by:
  1. Relational unique composite indexing (`@@unique([userId, eventId])`).
  2. Capacity availability check before writing the record.
  3. `409 Conflict` status returned gracefully if tickets run out or duplicate attempts occur.

### 3. Stateless HTTP-Only Cookie Authentication
- Passwords hashed using standard `bcryptjs` salt rounds.
- Signed JWTs stored in `httpOnly`, `sameSite: lax`, and `secure` cookies, preventing XSS-based token theft.

---

## 📬 Submission & Credits

- **Developer**: Yash Kruplani
- **Role Applied**: Web Development Lead / Core Team
- **Chapter**: Google Developer Groups (GDG) on Campus — Ramdeobaba University (RBU)
- **Recruitment Cycle**: 2026-2027
