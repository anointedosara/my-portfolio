import type { Project, Skill, Experience } from "@/types";

/**
 * Built-in content. Used to seed MongoDB (via /api/seed or the admin panel)
 * and as a fallback so the site renders fully even before a database is set up.
 */

export const profile = {
  name: "Anointed Osara",
  firstName: "Anointed",
  role: "Software Engineer (Frontend Developer)",
  roles: [
    "Software Engineer",
    "Frontend Developer",
    "React & Next.js Engineer",
    "Responsive UI Builder",
  ],
  location: "Nigeria",
  tagline:
    "I build modern, scalable, interactive and highly responsive web applications with React and Next.js.",
  bio: [
    "I'm a Software Engineer (Frontend Developer) based in Nigeria, looking to join a fast-growing startup. I bring sound knowledge and experience building modern, scalable, interactive and highly responsive web applications with React and Next.js.",
    "I turn Figma designs into clean, reusable components backed by consistent design systems, and I care about performance, SEO and accessibility — using techniques like server-side rendering (SSR) and dynamic routing in Next.js.",
    "I'm a graduate of the University of Benin (B.Sc. Geomatics, 2020–2025), and I'm always seeking challenging opportunities where I can grow while helping achieve organizational goals.",
  ],
  interests: ["Web Technologies", "Application Development", "Cloud", "Building Products"],
  hobbies: ["Playing Games", "Watching Movies & Web Series", "Learning new tech"],
  quote: {
    text: "The world rewards you for value provided, not time spent.",
    author: "James Clear",
  },
  email: "anointedosara@gmail.com",
  phone: "+2349124057670",
  cv: "/images/anointedosara-cv.pdf",
  avatar: "/images/anointed-osara.jpg",
  avatarFallback: "/images/profile-img.png.jpg",
  social: {
    github: "https://github.com/anointedosara",
    linkedin: "https://www.linkedin.com/in/anointed-osara-34313b23a",
    twitter: "https://twitter.com/OsaraAnointed",
  },
  stats: [
    { label: "Projects Built", value: "20+" },
    { label: "Years Coding", value: "4+" },
    { label: "Technologies", value: "12+" },
    { label: "Happy Clients", value: "5+" },
  ],
};

export const seedProjects: Project[] = [
  {
    title: "Commerce — Full-Stack Store",
    description:
      "A full-stack e-commerce store built with Next.js and MongoDB — browse products, build a cart and check out, backed by a typed API and a clean, fully responsive storefront.",
    image: "/images/proj-commerce.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://commerce-psi-three-94.vercel.app/",
    repoUrl: "https://github.com/anointedosara/commerce",
    featured: true,
    order: 1,
  },
  {
    title: "Medium — Analytics Dashboard",
    description:
      "A full-stack analytics dashboard with authentication, built on Next.js and MongoDB — interactive charts, real-time stats, earnings and product tables in a polished, responsive admin UI.",
    image: "/images/proj-medium-dashboard.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://medium-dashboard.vercel.app/",
    repoUrl: "https://github.com/anointedosara/medium-dashboard",
    featured: true,
    order: 2,
  },
  {
    title: "Jiwa Space — Living Spaces",
    description:
      "A full-stack living-space platform built with Next.js and MongoDB — browse and search curated spaces through an elegant onboarding flow and a refined, dark, fully responsive interface.",
    image: "/images/proj-jiwa-space.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://jiwa-space.vercel.app/",
    repoUrl: "https://github.com/anointedosara/jiwa-space",
    featured: true,
    order: 3,
  },
  {
    title: "FutureTech — AI News Platform",
    description:
      "A modern AI & tech news/blog platform built with Next.js and Tailwind CSS — featured articles, resources and a striking, fully responsive landing experience.",
    image: "/images/proj-ai-blog.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://ai-blog-page.vercel.app/",
    repoUrl: "https://github.com/anointedosara/ai-blog-page",
    featured: true,
    order: 4,
  },
  {
    title: "LankaStay — Booking Platform",
    description:
      "A hotel & stay booking platform built with Next.js and Tailwind CSS — search availability by location, guests and dates through a clean, conversion-focused UI.",
    image: "/images/proj-lankastay.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://lankastay-alpha.vercel.app/",
    repoUrl: "https://github.com/anointedosara/Lankastay",
    featured: true,
    order: 5,
  },
  {
    title: "Space Tourism Website",
    description:
      "A pixel-perfect, multi-page space tourism website — built with semantic HTML, CSS and JavaScript, fully responsive with tabbed destination, crew and technology pages.",
    image: "/images/proj-space-tourism.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://space-tourism-multi-page-website-seven.vercel.app/",
    repoUrl: "https://github.com/anointedosara/Space-tourism-multi-page-website",
    featured: true,
    order: 7,
  },
  {
    title: "REST Countries Explorer",
    description:
      "A REST Countries explorer built with Next.js — search, filter by region and view detailed country pages with live data from a RESTful API, plus a light/dark theme switcher.",
    image: "/images/proj-rest-countries.png",
    fallbackImage: "/images/home-main.svg",
    tags: ["Next.js", "REST API", "Tailwind CSS"],
    liveUrl: "https://rest-countries-api-with-color-theme-inky.vercel.app/",
    repoUrl: "https://github.com/anointedosara/REST-Countries-API-with-color-theme-switcher",
    featured: true,
    order: 6,
  },
];

export const seedSkills: Skill[] = [
  {
    name: "React",
    description: "Component-driven UIs, hooks, context and the wider React ecosystem.",
    icon: "Atom",
    level: 92,
    category: "Frontend",
    order: 1,
  },
  {
    name: "Next.js",
    description: "Server components, routing, API routes and full-stack React apps.",
    icon: "Triangle",
    level: 85,
    category: "Frontend",
    order: 2,
  },
  {
    name: "TypeScript",
    description: "Type-safe, maintainable codebases across front and back end.",
    icon: "FileCode2",
    level: 84,
    category: "Language",
    order: 3,
  },
  {
    name: "JavaScript",
    description: "Modern ES, async patterns, DOM and the language fundamentals.",
    icon: "Braces",
    level: 90,
    category: "Language",
    order: 4,
  },
  {
    name: "HTML5 & CSS3",
    description: "Semantic, accessible markup and modern, responsive styling.",
    icon: "Code2",
    level: 95,
    category: "Frontend",
    order: 5,
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first styling for fast, consistent and responsive design.",
    icon: "Palette",
    level: 90,
    category: "Frontend",
    order: 6,
  },
  {
    name: "RESTful APIs",
    description: "Consuming and integrating REST APIs with clean data flows.",
    icon: "Network",
    level: 86,
    category: "Backend",
    order: 7,
  },
  {
    name: "MongoDB",
    description: "Schema design and data modelling with Mongoose.",
    icon: "Database",
    level: 78,
    category: "Backend",
    order: 8,
  },
  {
    name: "Git & GitHub",
    description: "Version control, branching and collaborative pull-request workflows.",
    icon: "GitBranch",
    level: 88,
    category: "Tools",
    order: 9,
  },
  {
    name: "Responsive Design",
    description: "Pixel-perfect layouts that adapt across every screen size.",
    icon: "Smartphone",
    level: 95,
    category: "Frontend",
    order: 10,
  },
  {
    name: "Firebase",
    description: "Auth, hosting and realtime data for rapid app delivery.",
    icon: "Flame",
    level: 75,
    category: "Backend",
    order: 11,
  },
  {
    name: "UI / Animation",
    description: "Motion and micro-interactions with Framer Motion & GSAP.",
    icon: "Sparkles",
    level: 82,
    category: "Frontend",
    order: 12,
  },
];

export const seedExperience: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Cloudolle — United Kingdom (Remote)",
    period: "Jul 2023 – Jan 2024",
    description:
      "Developed and optimized the company's landing pages with Next.js and Styled Components for modern, responsive, accessible UIs. Translated Figma wireframes into clean, reusable React components with a consistent design system, and improved performance and SEO using server-side rendering (SSR) and dynamic routing.",
    type: "work",
    order: 1,
  },
  {
    role: "Frontend Developer Intern",
    company: "Zuri Team — Lagos, Nigeria",
    period: "Aug 2022 – Nov 2022",
    description:
      "Completed a rigorous, fast-paced internship through to the final stage. Built several front-end projects and collaborated with a team of skilled developers and designers to ship responsive web applications.",
    type: "work",
    order: 2,
  },
  {
    role: "B.Sc. Geomatics",
    company: "University of Benin",
    period: "2020 – 2025",
    description:
      "Graduated from the Faculty of Environmental Science, Department of Geomatics — balancing academics with continuous self-driven software development.",
    type: "education",
    order: 3,
  },
  {
    role: "JavaScript Algorithms & Data Structures",
    company: "freeCodeCamp",
    period: "Jun 2022",
    description:
      "Certified in core to intermediate JavaScript, data structures and algorithms — building strong language fundamentals.",
    type: "education",
    order: 4,
  },
  {
    role: "Responsive Web Design",
    company: "freeCodeCamp",
    period: "Mar 2022",
    description:
      "Certified in responsive web design fundamentals through to advanced layout techniques.",
    type: "education",
    order: 5,
  },
];
