# Import Plan: Saas Video Generator → Template (Remotion SaaS)

## Overview
Copy pages, components, libs, hooks, types from `Saas Video generator` into `template-prompt-to-motion-graphics-saas`. NO APIs imported — we build on top of the existing Remotion engine. Auth backend (Firebase Auth only, no Firestore DB). Custom DB design later.

---

## MASTER EXCLUSION LIST

### Pages EXCLUDED:
- ❌ `/dashboard/draft` — skip
- ❌ `/director/[id]` — skip
- ❌ `/draft/director/[id]` — skip
- ❌ `/generate/[id]` — skip (already exists in target as `/generate`)
- ❌ `/generate` root — skip (already exists in target)
- ❌ `/plan/[id]` — skip
- ❌ `/render/[id]` — skip
- ❌ `/demo/generate` — empty
- ❌ `/demo/modular-forge` — empty
- ❌ `/draft/legacy-plan` — empty
- ❌ `/draft/plan` — empty
- ❌ `/test/plan` — dev only
- ❌ `/test/prompt` — dev only

### Components EXCLUDED:
- ❌ `NewProjectModal.tsx` — dashboard form, skip

### ALL APIs EXCLUDED (build on existing Remotion engine):
- ❌ `/api/director`
- ❌ `/api/enhance-prompt` (already in target)
- ❌ `/api/generate` (already in target)
- ❌ `/api/lambda/*` (already in target)
- ❌ `/api/music`
- ❌ `/api/payments/checkout`
- ❌ `/api/payments/history`
- ❌ `/api/payments/webhook`
- ❌ `/api/proxy-image`
- ❌ `/api/tts` (already in target)
- ❌ `/api/webhooks/dodo`

### Other EXCLUDED:
- ❌ `src/remotion/` — already in target
- ❌ `remotion.config.ts` — already in target
- ❌ `deploy.mjs` — already in target
- ❌ `config.mjs` — already in target
- ❌ Firebase Firestore DB code — will custom design later

---

## FINAL EXPORT LIST — Pages (slugs)

| # | Slug | File |
|---|---|---|
| 1 | `/` | `page.tsx` (landing page) |
| 2 | `/login` | `login/page.tsx` |
| 3 | `/signup` | `signup/page.tsx` |
| 4 | `/forgot-password` | `forgot-password/page.tsx` |
| 5 | `/dashboard` | `dashboard/page.tsx` + `dashboard/layout.tsx` |
| 6 | `/profile` | `profile/page.tsx` |
| 7 | `/billing` | `billing/page.tsx` |
| 8 | `/downloads` | `downloads/page.tsx` |
| 9 | `/about` | `about/page.tsx` |
| 10 | `/terms` | `terms/page.tsx` |
| 11 | `/privacy` | `privacy/page.tsx` |
| 12 | `/support` | `support/page.tsx` |
| 13 | `/roadmap` | `roadmap/page.tsx` |
| 14 | `/waitlist` | `waitlist/page.tsx` |
| 15 | `/affiliate` | `affiliate/page.tsx` |
| 16 | `/not-found` | `not-found.tsx` (404) |

**Total: 16 page slugs**

---

## Phase 1: Foundation — Auth Backend & Core Libs

### 1.1 Firebase Auth (NO Firestore DB)
- Copy `src/lib/firebase.ts` — but STRIP all Firestore imports/exports, keep only Auth init
- Copy `src/context/AuthContext.tsx` — Auth context provider (uses Firebase Auth only)
- Copy `src/components/ProtectedRoute.tsx` — Route protection wrapper

### 1.2 Core Libraries (non-DB)
- Copy `src/lib/utils.ts` — utility functions (merge with existing if needed)
- Copy `src/lib/gtag.ts` — Google Analytics helper
- Copy `src/lib/dodo.ts` — DodoPayments client (for billing page)
- Copy `src/lib/oblivion.ts` — Oblivion utility
- Copy `src/lib/render-service.ts` — Render service

### 1.3 Additional Types
- Copy `src/types/constants.ts`
- Copy `src/types/gtag.d.ts`
- Copy `src/types/oblivion.ts`
- Copy `src/types/project.ts`
- Copy `src/types/schema.ts`

### 1.4 Additional Hooks
- Copy `src/hooks/use-mouse-position.ts`
- Copy `src/hooks/useProjectState.ts`

### 1.5 Config
- Copy `src/config/music.ts`

### 1.6 New Dependencies (ADD to package.json)
- `dodopayments`
- `browser-image-compression`
- `katex`
- `lodash`
- `luxon`
- `nanoid`
- `next-themes`
- `react-markdown`
- `rehype-katex`
- `remark-gfm`
- `remark-math`
- `sonner`
- `vaul`

---

## Phase 2: Auth Pages

- Copy `src/app/login/page.tsx`
- Copy `src/app/signup/page.tsx`
- Copy `src/app/forgot-password/page.tsx`

---

## Phase 3: Dashboard (without form, without Firestore)

### 3.1 Dashboard Pages
- Copy `src/app/dashboard/layout.tsx` — auth guard layout
- Copy `src/app/dashboard/page.tsx` — BUT strip Firestore calls (collection, query, onSnapshot, deleteDoc). Leave UI shell, project grid will be rewired to custom DB later.

### 3.2 Dashboard Components
- Copy `src/components/DashboardNav.tsx`
- Copy `src/components/OnboardingTour.tsx`
- Copy `src/components/ModalProvider.tsx`
- Copy `src/components/Loader.tsx`
- ❌ SKIP `src/components/NewProjectModal.tsx`
- ❌ SKIP `src/components/ProjectCreationOverlay.tsx` (depends on form)

### 3.3 Profile & Billing
- Copy `src/app/profile/page.tsx`
- Copy `src/app/billing/page.tsx`
- Copy `src/app/downloads/page.tsx`

### 3.4 Payment Components
- Copy `src/components/Pricing.tsx`
- Copy `src/components/RenderPaymentDrawer.tsx`

---

## Phase 4: Landing Page & Marketing

### 4.1 Landing Page
- Copy `src/app/page.tsx` (replaces existing landing)
- Copy `src/app/globals.css` (merge with existing)
- Copy `src/app/not-found.tsx`

### 4.2 Landing Components
- Copy `src/components/Navbar.tsx`
- Copy `src/components/Hero.tsx`
- Copy `src/components/Features.tsx`
- Copy `src/components/HowItWorks.tsx`
- Copy `src/components/Process.tsx`
- Copy `src/components/Showcase.tsx`
- Copy `src/components/CTA.tsx`
- Copy `src/components/FAQ.tsx`
- Copy `src/components/Footer.tsx`
- Copy `src/components/HighlightCards.tsx`
- Copy `src/components/VideoDemo.tsx`
- Copy `src/components/VideoSection.tsx`
- Copy `src/components/SocialButton.tsx`
- Copy `src/components/GoogleAnalytics.tsx`
- Copy `src/components/logo.tsx`
- Copy `src/components/AILoadingState.tsx`
- Copy `src/components/SmoothDrawer.tsx`
- Copy `src/components/WaitlistModal.tsx`

### 4.3 UI Component Libraries
- Copy `src/components/magicui/` (entire folder)
- Copy `src/components/motion-primitives/` (entire folder)

### 4.4 Static Pages
- Copy `src/app/about/page.tsx`
- Copy `src/app/terms/page.tsx`
- Copy `src/app/privacy/page.tsx`
- Copy `src/app/support/page.tsx`
- Copy `src/app/roadmap/page.tsx`
- Copy `src/app/waitlist/page.tsx`
- Copy `src/app/affiliate/page.tsx`

---

## Phase 5: Layout, Styles & Assets

### 5.1 Root Layout
- Merge `src/app/layout.tsx` — add AuthContext, ThemeProvider, ModalProvider, Toaster into existing layout. Keep all existing Remotion setup.

### 5.2 Styles
- Merge `src/app/globals.css` — add source styles without breaking existing

### 5.3 Public Assets
- Copy `public/music/` (background music tracks)
- Copy `public/sfx/` (sound effects)
- Copy `public/icon.svg`
- Copy `public/waitlist_hero.png`
- Copy `public/zaid.jpg`

### 5.4 Root Config
- Merge `.env` — add Firebase Auth keys, DodoPayments keys
- Copy `firestore.rules` (for reference, even though we're custom designing DB)

---

## Phase 6: Install & Verify

### 6.1 Install dependencies
### 6.2 TypeScript check (`tsc --noEmit`)
### 6.3 Fix broken imports
### 6.4 Test build (`npm run build`)

---

## IMPORTANT RULES
1. **NEVER touch `src/remotion/`** — core of the template
2. **NO APIs imported** — build on existing Remotion engine
3. **Firebase Auth ONLY** — no Firestore DB imports, custom DB later
4. **No dashboard form** — NewProjectModal excluded
5. **Copy as-is** — direct copy-paste, no rewriting
6. **Merge carefully** — layout.tsx, globals.css, package.json = merge, not overwrite
7. **Dashboard Firestore calls** — strip them, leave UI shell for rewiring
