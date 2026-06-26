# IProcess PH — Official Website

[![Vercel Deployment](https://img.shields.io/badge/vercel-deployed-000?logo=vercel)](https://i-process-delta.vercel.app/)
[![Built with Vite](https://img.shields.io/badge/built%20with-vite-646CFF?logo=vite)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/animations-GSAP-88CE02?logo=greensock)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/styling-tailwindcss-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 📌 Overview

**IProcess PH** is the official brand and marketing website for IProcess, a company that simplifies business transactions for franchisees and merchants across the Philippines. The site serves as a digital storefront, providing information about the company's services, franchise opportunities, and merchant resources.

The project is built with a modern, performance-focused stack using **Vite**, **Tailwind CSS v4**, and **GSAP** (with ScrollTrigger and ScrollSmoother). It features a component-based architecture, smooth scroll animations, and a fully responsive design.

**Live URL:** [https://i-process-delta.vercel.app/](https://i-process-delta.vercel.app/)

## 🎯 Project Goals

1.  **Brand Showcase**: Present IProcess as a modern, trustworthy partner for business transactions.
2.  **User Engagement**: Provide clear pathways for potential franchisees and merchants to learn about and engage with the company.
3.  **Performance & Experience**: Deliver a fast, smooth, and visually engaging experience with advanced animations.
4.  **Content Management**: Clearly present detailed information (like franchise packages and requirements) in a structured, scannable way.

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Build Tool** | [Vite](https://vitejs.dev/) | Fast development server and build tool |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework with `@theme` for design tokens |
| **Animations** | [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/scrolltrigger/) & [ScrollSmoother](https://gsap.com/scrollsmoother/) | High-performance scroll-based animations and smooth scrolling |
| **Architecture** | Component-based HTML | Sections loaded dynamically via `fetch()` for maintainability |
| **Deployment** | [Vercel](https://vercel.com/) | Hosting and continuous deployment |
| **Version Control** | [Git](https://git-scm.com/) & [GitHub](https://github.com/Mrakdatkom/IProcess) | Code management and collaboration |

## 📁 Project Structure
IProcess/
├── franchise/ # Standalone Franchise page
│ └── index.html
├── images/ # Static image assets
│ ├── history/ # Timeline images for About section
│ ├── partners/ # Partner logos
│ └── services/ # Service section images
├── js/
│ ├── animations/ # GSAP animation scripts per section
│ │ ├── about.js
│ │ ├── choose-us.js
│ │ ├── hero.js
│ │ ├── partners.js
│ │ └── services.js
│ └── main.js # Main entry point, section loader, and router
├── merchant/ # Standalone Merchant page
│ └── index.html
├── public/ # Public static assets
│ └── vendor/ # Local GSAP ESM package
│ └── gsap/
├── sections/ # HTML partials for the homepage
│ ├── about.html
│ ├── choose-us.html
│ ├── hero.html
│ ├── partners.html
│ └── services.html
├── styles/
│ └── main.css # Source of truth: @theme + custom styles
├── .gitignore
├── index.html # Homepage
├── package.json
├── vercel.json # Vercel deployment configuration
└── vite.config.js # Vite configuration

text

## 🧩 Key Features & Pages

### 1. Homepage (`index.html`)
A dynamic, single-page application that loads all sections dynamically. It serves as the primary entry point for users.

- **Hero Section**: Features a cinematic depth-stack effect with a background, editorial headline, and foreground, powered by GSAP.
- **Partners Section**: Displays an infinite, seamless marquee of partner logos that pauses on hover.
- **About Section**: An interactive history timeline. Users can hover over years to change the displayed image, ghost year number, and description with an instant swap.
- **Choose Us Section**: A "bento grid" of key statistics (e.g., "5+ Years in Service", "500+ Active Merchants"). Cards have a glass-morphism effect on a background image and feature number counters.
- **Services Section**: An interactive list where hovering over a service item expands its description and swaps the corresponding image on the right panel.
- **Footer**: Contains brand info, navigation links, social icons, and legal links. The copyright year auto-updates.

### 2. Franchise Page (`/franchise/`)
A dedicated, standalone page for prospective franchisees. It presents comprehensive information in a structured, scannable format.

- **Hero**: Clear value proposition with quick navigation links to key sections (#benefits, #requirements, #packages).
- **Benefits**: Detailed breakdown of franchise benefits (Comprehensive Training, Ongoing Support, etc.) with supporting image grids.
- **Requirements**: Clearly categorized lists for Location, Population, and Applicant requirements.
- **Packages**: A responsive, tiered display of franchise packages (Agent, Bronze, Silver, Gold, Platinum). Each card shows the price, level, key requirements, and a "Get Started" CTA. The **Gold package is featured** as the "Most Popular".
- **CTA**: A final call-to-action with a phone link, encouraging users to get in touch.

### 3. Merchant Page (`/merchant/`)
A resource hub designed for existing merchants.

- **Header**: Clear welcome message and page purpose.
- **Quick Access Grid**: Three primary action cards: "Operational Systems", "Online Application", and "Merchant Concerns", which serve as a launchpad for their respective tools or portals.
- **Support**: Displays contact information (phone and email) for easy access to technical assistance.

## 🎨 Design System

- **Color Palette**: Based on a 60/30/10 rule with a primary blue (`#046bd2`), off-white secondary (`#f8f9fa`), and slate gray accent (`#4a5568`). The hero and franchise/merchant pages feature dark, dramatic backgrounds with gradient overlays.
- **Typography**: Uses Google Fonts: `Playfair Display` (serif, italic) for titles and `Lato` (sans-serif) for body text, creating a sophisticated and highly readable contrast.
- **Glass-morphism**: Used in the "Choose Us" cards and the mobile drawer for a modern, premium feel.
- **Responsiveness**: Every section is fully responsive across mobile, tablet, and desktop using Tailwind's responsive utilities.

## ⚡ Performance & Optimization

- **Local Dependencies**: GSAP is installed locally in the `vendor` folder to eliminate CDN latency.
- **Smooth Scrolling**: `ScrollSmoother` provides a buttery-smooth scrolling experience.
- **Image Handling**: Placeholder images are used during development, with a recommendation to use WebP format for production. Images in the About section are preloaded to enable instant swapping on hover.
- **Component-based Loading**: HTML sections are loaded dynamically, improving initial load time and code maintainability.
- **Vercel Hosting**: The site is deployed on Vercel, benefiting from its global CDN and automatic optimizations.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Mrakdatkom/IProcess.git
    cd IProcess
Install dependencies

bash
npm install
Start the development server

bash
npm run dev
The site will be available at http://localhost:5173.

Build for production

bash
npm run build
The production-ready files will be in the dist folder.

Preview the production build

bash
npm run preview
🔗 Deployment
The project is configured for easy deployment on Vercel.

The project includes a vercel.json file with build and routing settings.

The main branch is automatically deployed via the Vercel Git integration.

All internal links use clean URLs (e.g., /franchise/, /merchant/) via Vercel's routing.

👥 Contributors
Mark Ryan Zipagan (Mrakdatkom) - Lead Developer

📄 License
This project is licensed under the ISC License.

Built with ❤️ by the IProcess Team

text

## 📝 How to Use

1. **Copy** the entire code block above.
2. **Save** it as `README.md` in your project's root directory (the same folder where `package.json` lives).
3. **Optional**: Replace the placeholder email or phone number if needed.
4. **Commit** the file:
   ```bash
   git add README.md
   git commit -m "Add comprehensive README"
   git push origin main