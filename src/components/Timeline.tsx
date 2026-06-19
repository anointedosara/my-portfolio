"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Experience } from "@/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Timeline({ items }: { items: Experience[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-item");
      if (!nodes.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(nodes, { opacity: 1, y: 0 });
        return;
      }

      nodes.forEach((node) => {
        gsap.set(node, { opacity: 0, y: 30 });
        gsap.to(node, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-brand-400 via-blue-500 to-transparent md:left-1/2" />
      <div className="space-y-10">
        {items.map((item, i) => {
          const isWork = item.type === "work";
          const Icon = isWork ? Briefcase : GraduationCap;
          const left = i % 2 === 0;
          return (
            <div
              key={item._id || `${item.role}-${i}`}
              className={`timeline-item gsap-reveal relative pl-12 md:w-1/2 md:pl-0 ${
                left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              <span
                className={`absolute top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-blue-600 text-white shadow-lg ring-4 ring-[rgb(var(--bg))] left-0 md:left-auto ${
                  left ? "md:-right-4" : "md:-left-4"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="card card-hover text-left">
                <span className="chip">{item.period}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{item.role}</h3>
                <p className="text-sm font-medium text-brand-400">{item.company}</p>
                <p className="mt-2 text-sm text-soft">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
