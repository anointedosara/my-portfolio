"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types";

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

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.tags?.includes(active));

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === tag
                ? "bg-gradient-to-r from-brand-400 to-indigo-500 text-white shadow-lg"
                : "surface text-soft hover:text-brand-400"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project._id || project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-soft">No projects found for &ldquo;{active}&rdquo;.</p>
      )}
    </div>
  );
}
