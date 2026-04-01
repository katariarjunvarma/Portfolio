# Katari Arjun Varma - Premium AI Portfolio

A premium, minimal, dark-first, highly responsive personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI architecture, Framer Motion, Lenis smooth scrolling, and React Three Fiber.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn-style component architecture
- Framer Motion
- Lenis
- React Three Fiber
- Lucide React
- Inter font
- React Hook Form
- Vercel-ready deployment setup

## Folder Structure

```text
.
├── app
│   ├── globals.css
│   ├── icon.svg
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── layout
│   │   ├── navbar.tsx
│   │   ├── scroll-progress.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── sections
│   │   ├── about-section.tsx
│   │   ├── blog-section.tsx
│   │   ├── contact-section.tsx
│   │   ├── hero-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── research-section.tsx
│   │   ├── section-title.tsx
│   │   └── skills-section.tsx
│   ├── ui
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   └── textarea.tsx
│   ├── background-effects.tsx
│   ├── cursor-glow.tsx
│   ├── floating-cube.tsx
│   ├── footer.tsx
│   ├── page-shell.tsx
│   ├── section-reveal.tsx
│   ├── seo-json-ld.tsx
│   └── smooth-scroll-provider.tsx
├── lib
│   ├── site.ts
│   └── utils.ts
├── public
│   ├── og-image.svg
│   └── resume-katari-arjun-varma.pdf
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm run start
```

## SEO Included

- Canonical metadata configured for `https://arjunvarma.in`
- OpenGraph metadata
- Twitter card metadata
- JSON-LD Person schema
- JSON-LD research schema (ScholarlyArticle)
- JSON-LD project schema (ItemList + SoftwareSourceCode)
- `robots.txt` via `app/robots.ts`
- `sitemap.xml` via `app/sitemap.ts`
- Target keywords embedded in metadata

## Deploy to Vercel

1. Push this project to GitHub.
2. Import the repo into Vercel.
3. Framework preset: Next.js (auto-detected).
4. Deploy.

## Change Domain Later

1. In Vercel, open project settings -> Domains.
2. Add `arjunvarma.in` (or your final domain).
3. Update DNS records at your registrar.
4. Ensure `lib/site.ts` has the final `url` and `domain` values.
5. Redeploy so canonical, sitemap, JSON-LD, and OG URLs stay aligned.

## Customize Content

Update centralized content in:

- `lib/site.ts` for profile data, social links, skills, projects, research, and blog placeholders.

Customize visuals in:

- `app/globals.css` for theme tokens and global styling.
- `components/sections/*` for layout and section-level UI.
- `components/background-effects.tsx` and `components/floating-cube.tsx` for ambient visuals.

## Notes

- Contact form is frontend-only placeholder (React Hook Form) and not connected to a backend.
- Resume file is currently a placeholder at `public/resume-katari-arjun-varma.pdf`.
