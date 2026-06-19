"use client";

import { useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Only these key technologies appear as filters (in this order), and only
// when at least one project actually uses them. Other tags still show on cards.
const PRIORITY_FILTERS = [
  "Next.js",
  "TypeScript",
  "JavaScript",
  "REST API",
  "MongoDB",
  "Tailwind CSS",
];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const tags = useMemo(() => {
    const present = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => present.add(t)));
    return ["All", ...PRIORITY_FILTERS.filter((t) => present.has(t))];
  }, [projects]);

  const [active, setActive] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.tags?.includes(active));

  // Each card reveals on its own as it scrolls into view — re-runs on filter change.
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      if (!items.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      items.forEach((item, i) => {
        gsap.set(item, { opacity: 0, y: 24, scale: 0.96 });
        gsap.to(item, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          // Small stagger for cards that enter the viewport together (per row).
          delay: (i % 3) * 0.08,
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
          onComplete: () => gsap.set(item, { clearProps: "transform" }),
        });
      });
    },
    { scope: gridRef, dependencies: [active] }
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === tag
                ? "bg-gradient-to-r from-brand-400 to-blue-600 text-white shadow-lg"
                : "surface text-soft hover:text-brand-400"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <div key={project._id || project.title} className="project-item gsap-reveal">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-soft">No projects found for &ldquo;{active}&rdquo;.</p>
      )}
    </div>
  );
}
