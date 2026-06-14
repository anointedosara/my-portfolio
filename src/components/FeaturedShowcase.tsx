"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import type { Project } from "@/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeaturedShowcase({ projects }: { projects: Project[] }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const t = track.current;
          if (!t) return;
          const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);

          gsap.to(t, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );
      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section ref={section} className="relative py-20 md:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Featured <span className="gradient-text">Projects</span>
            </>
          }
          subtitle="A selection of full-stack apps I've designed and built. On desktop, scroll to glide through them."
        />
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div className="mt-14 hidden overflow-hidden lg:block">
        <div ref={track} className="flex w-max flex-nowrap gap-8 pl-12 pr-[12vw]">
          {projects.map((project) => (
            <div key={project._id || project.title} className="w-[400px] shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
          <div className="flex w-[320px] shrink-0 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold">
                Want to see <span className="gradient-text">more?</span>
              </h3>
              <p className="mt-2 text-sm text-soft">Explore the full archive of my work.</p>
              <Link href="/projects" className="btn-primary mt-5">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked grid */}
      <div className="container mt-12 lg:hidden">
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <Reveal key={project._id || project.title}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="btn-primary">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
