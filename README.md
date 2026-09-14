# Dev Jangid — Computer Science Engineer | Interactive Neo-Brutalism Portfolio

> Production-ready, motion-rich personal portfolio engineered for **Dev Jangid, Computer Science Engineer**, inspired by the telemetry and interactive portal aesthetics of [Lakshay Chawla's portfolio](https://lakshay-13.github.io/).

[![Build and Test](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-19.x-61dafb?style=flat-square)](#)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square)](#)
[![GSAP](https://img.shields.io/badge/GSAP-3.x%20%2B%20ScrollTrigger-88CE02?style=flat-square)](#)

---

## 1. Overview & Visual Identity

The portfolio embodies an expressive **Neo-Brutalism** design system merged with technical engineering telemetry:

- **Composition**: High-contrast geometric cards, hard 4px/6px offset shadows (`box-shadow: 4px 4px 0px #111317`), solid 3px borders, and asymmetric layout grids.
- **Palette**:
  - **Light Mode**: Warm off-white (`#FAF8F5`), crisp white cards (`#FFFFFF`), solid near-black (`#111317`), electric lime (`#CCFF00`), and international citrus orange (`#FF5500`).
  - **Dark Mode**: Rich ink space background (`#0A0D12`), midnight cards (`#131720`), high-contrast electric lime accents (`#CCFF00`), cyan (`#00E5FF`), and border contrast.
- **Typography**: Dual-type hierarchy pairing **Space Grotesk** for bold oversized headings with **JetBrains Mono** for telemetry tags, timestamps, code badges, and section indicators.
- **Motion System**: Powered by **GSAP** and **ScrollTrigger**, featuring:
  - Open-source SVG path morphing (powered by **Flubber**) animating smoothly between four engineering symbols: Microprocessor, Code Terminal, Gemini AI Diamond, and CanSat Satellite.
  - Staggered entrances, scroll-driven card reveals, and tactile button feedback.
  - Full compliance with `prefers-reduced-motion`.
- **Interactive Telemetry Portal**: An entry experience inspired by `lakshay-13.github.io` featuring rotating orbit pills (DSA, AAI, ISL, GenAI RAG, Gemini, Streamlit) around a central interactive core, transitioning smoothly into the main portfolio upon initialization, with a persistent header toggle to reopen at any time.

---

## 2. Verified Resume Data Architecture

All professional credentials and resume facts are isolated in a single, easily editable configuration file: [`src/data/portfolio.ts`](./src/data/portfolio.ts).

### Verified Credentials Incorporated:
- **Personal Information**:
  - Name: **Dev Jangid**
  - Title: **Computer Science Engineer**
  - Location: **Faridabad, India 121005**
  - Email: `jangid.dev20@gmail.com`
  - Phone: `+91 92125 53300` (`9212553300`)
  - Status: `OPEN FOR OPPORTUNITIES`
  - Resume Statement: *"Dynamic IT professional with hands-on experience at Airports Authority of India, specializing in system maintenance and network security compliance. Proficient in data structures and algorithms, with strong problem-solving skills focused on improving IT processes and delivering innovative solutions in fast-paced environments."*
- **Work Experience**:
  1. **IT Intern — Airports Authority of India (AAI)** (July 2026 – August 2026 | New Delhi, India)
  2. **Space Technology Intern — India Space Lab (ISL)** (June 2025 – July 2025 | Haryana, India)
  3. **Generative AI Trainee** (April 2025 – June 2025 | Specialized Training Program)
- **Skills Categorization**:
  - **Programming Languages**: C, C++, Java, SQL
  - **Core Computer Science**: Data Structures and Algorithms (DSA), Object-Oriented Programming (OOP)
  - **Web and AI Development**: Full-Stack Web Development, Generative AI, Gemini APIs, Vertex AI, Multimodal RAG, Streamlit
  - **Tools and Systems**: Git, Database Management, IT Infrastructure, Network Troubleshooting
- **Education**:
  - **Bachelor’s Degree — Computer Science and Engineering**: Jagannath University, Bahadurgarh, Haryana (Expected June 2027)
  - **High School Diploma**: Jiva Public School, Faridabad, Haryana (April 2022)
- **Projects & Highlights**:
  - In strict accordance with engineering integrity, no unverified standalone repositories or dead demo links were fabricated.
  - Honest domain highlights derived from the resume are provided: *Generative AI & Multimodal RAG*, *IT Infrastructure & Network Operations*, and *Space Technology & Satellite Systems*.
  - An empty state is provided for standalone projects with a clear hook in `standaloneProjects` to add GitHub repositories and live URLs as they become verified.

---

## 3. Project Structure

```text
dev-jangid-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow with custom domain support
├── public/
│   ├── favicon.svg             # Neo-Brutalist DJ monogram vector favicon
│   ├── og-image.svg            # Open Graph social sharing vector card
│   ├── robots.txt              # Search engine crawler permissions
│   └── sitemap.xml             # Search engine XML sitemap
├── src/
│   ├── components/
│   │   ├── Footer.tsx          # Dynamic copyright year, back-to-top, verified info
│   │   ├── MorphingGraphic.tsx # Flubber + GSAP SVG path interpolation
│   │   ├── Navbar.tsx          # Sticky header, theme toggle, mobile drawer, portal toggle
│   │   └── PortalEntry.tsx     # Lakshay-13 inspired telemetry orbit modal & entry
│   ├── data/
│   │   └── portfolio.ts        # Single source of truth for all resume data
│   ├── hooks/
│   │   └── useTheme.ts         # Dark/Light mode hook with localStorage & OS detection
│   ├── sections/
│   │   ├── AboutSection.tsx    # Executive bio statement and 4 core competencies
│   │   ├── ContactSection.tsx  # Formspree form, honeypot anti-spam, direct channels
│   │   ├── EducationSection.tsx# B.Tech CSE (2027) & High School (2022) cards
│   │   ├── ExperienceSection.tsx# AAI, ISL, and GenAI timeline with markers
│   │   ├── HeroSection.tsx     # Oversized typography, morphing card, CTAs
│   │   ├── ProjectsSection.tsx # Domain highlights & standalone projects empty state
│   │   └── SkillsSection.tsx   # 4 skill categories with interactive focus
│   ├── test/
│   │   ├── contact.test.tsx    # Form validation, email format, honeypot tests
│   │   ├── portfolio.test.ts   # Data integrity & uncompromised resume truth tests
│   │   └── setup.ts            # Vitest + jsdom + window.matchMedia mock setup
│   ├── App.tsx                 # Root application composition
│   ├── index.css               # Tailwind CSS v4 tokens, Neo-Brutalist shadows & borders
│   └── main.tsx                # StrictMode entrypoint
├── .env.example                # Sample environment variables
├── index.html                  # Anti-FOUC script, Google Fonts preconnect, OG tags
├── package.json                # Dependencies, build scripts, test scripts
├── tsconfig.app.json           # Application TypeScript configuration
├── tsconfig.json               # Root TypeScript configuration
├── tsconfig.node.json          # Node TypeScript configuration
└── vite.config.ts              # Vite + React + Tailwind v4 + Vitest configuration
```

---

## 4. Local Development & Testing

### Prerequisites
- Node.js `v20.x` or `v24.x`
- npm `10.x` or `11.x`

### Installation
```bash
git clone <repository-url>
cd dev-jangid-portfolio
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Run Automated Tests
```bash
npm run test
```
Executes Vitest suite verifying:
- Resume data authenticity (no fabricated employers, projects, or dates).
- Contact form validation (empty fields, malformed email, minimum message length).
- Direct communication channel link formatting (`mailto:` and `tel:`).

### Run Linter
```bash
npm run lint
```
Executes Oxlint with 0 errors and 0 warnings.

### Build Production Bundle
```bash
npm run build
```
Executes `tsc -b` and `vite build`. Static assets are emitted to the `dist/` directory.

---

## 5. Contact Form Integration (Formspree)

The contact form is configured to dispatch messages via [Formspree](https://formspree.io/):

1. **Obtain a Form ID**:
   - Register or log in at [Formspree](https://formspree.io/).
   - Create a new form pointing to `jangid.dev20@gmail.com`.
   - Copy the form endpoint hash (e.g., if endpoint is `https://formspree.io/f/xyzpqrst`, the Form ID is `xyzpqrst`).
2. **Local Development**:
   - Create `.env` in the root:
     ```env
     VITE_FORMSPREE_FORM_ID=xyzpqrst
     VITE_BASE_PATH=./
     ```
3. **GitHub Deployment**:
   - In your GitHub repository, navigate to **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Add a repository variable named `VITE_FORMSPREE_FORM_ID` with your Form ID.
   - The deployment workflow automatically injects this variable during the static build.
4. **Graceful Fallback**:
   - If `VITE_FORMSPREE_FORM_ID` is left empty, the form displays a helpful inline message prompting the visitor to reach out directly via `jangid.dev20@gmail.com` or phone.

---

## 6. GitHub Pages & Custom Domain Deployment

The repository includes a GitHub Actions workflow: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

### Default GitHub Pages Deployment (No Custom Domain):
1. In the GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Push changes to `main` or trigger manually from the **Actions** tab.
4. The site will be published at `https://<github-username>.github.io/<repository-name>/`.
5. Because Vite base path is set to relative (`./`), all assets, scripts, stylesheets, and SVG graphics load without 404 errors.

### Custom Domain Configuration (e.g. `devjangid.com`):
When a custom domain is ready to be configured:
1. **GitHub Repository Variable**:
   - Go to **Settings** > **Secrets and variables** > **Actions** > **Variables**.
   - Add a variable `CUSTOM_DOMAIN` set to your domain name (e.g., `devjangid.com`).
   - The GitHub Actions workflow will automatically generate the `dist/CNAME` file and configure Vite with the root base path (`/`).
2. **DNS Configuration**:
   - In your domain registrar (e.g., Cloudflare, Namecheap, GoDaddy):
     - **Apex Domain (`devjangid.com`)**: Add four `A` records pointing to GitHub Pages IP addresses:
       ```text
       185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
       ```
     - **Subdomain (`www.devjangid.com`)**: Add a `CNAME` record pointing to `<github-username>.github.io`.
3. **Enforce HTTPS**:
   - In GitHub repository **Settings** > **Pages**, verify your custom domain and check **Enforce HTTPS** once DNS propagation completes (typically 5 to 60 minutes).

---

## 7. Accessibility & Performance Highlights

- **Contrast**: Full WCAG AA contrast compliance across both Light and Dark themes.
- **Zero FOUC**: In-head script initializes theme class prior to DOM render, preventing light-to-dark flashing.
- **Reduced Motion**: Automatically detects `prefers-reduced-motion` and disables transforms and interval morphing while preserving 100% of readable content.
- **Responsive Layouts**: Tested across mobile (320px–480px), tablet (768px–1024px), and desktop (1280px+).
- **Honeypot Anti-Spam**: Embedded hidden `_gotcha` input traps malicious automated bots without disrupting legitimate users.
