"use client";

import { Github, ExternalLink, Star } from "lucide-react";
import type { Project } from "@/types";
import { trackEvent } from "./AnalyticsTracker";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group card card-hover flex flex-col overflow-hidden !p-0">
      <div className="relative aspect-video overflow-hidden bg-soft">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image || project.fallbackImage || "/images/home-main.svg"}
          alt={`${project.title} screenshot`}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            const fallback = project.fallbackImage || "/images/home-main.svg";
            if (img.src !== window.location.origin + fallback && !img.dataset.fallback) {
              img.dataset.fallback = "true";
              img.src = fallback;
            }
          }}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {project.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Star className="h-3 w-3 fill-brand-400 text-brand-400" /> Featured
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 flex translate-y-4 gap-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("project_click", `${project.title} (live)`)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-brand-100"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("project_click", `${project.title} (repo)`)}
              className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-black"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-soft">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
