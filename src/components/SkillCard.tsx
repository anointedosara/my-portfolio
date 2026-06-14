"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Skill } from "@/types";
import { SkillIcon } from "./SkillIcon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const level = typeof skill.level === "number" ? skill.level : null;

  useGSAP(
    () => {
      const card = ref.current;
      if (!card) return;
      const bar = card.querySelector<HTMLElement>(".skill-bar");

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(card, { opacity: 1, y: 0 });
        if (bar && level !== null) gsap.set(bar, { width: `${level}%` });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 90%", once: true },
        delay: (index % 3) * 0.08,
      });
      tl.from(card, { y: 36, opacity: 0, duration: 0.7, ease: "power3.out" });
      if (bar && level !== null) {
        tl.to(bar, { width: `${level}%`, duration: 1, ease: "power2.out" }, "-=0.35");
      }
    },
    { scope: ref, dependencies: [level] }
  );

  return (
    <div ref={ref} className="card card-hover group">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400/15 to-indigo-500/15 text-brand-400 transition-transform duration-300 group-hover:scale-110">
          <SkillIcon name={skill.icon} className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display font-semibold">{skill.name}</h3>
          <span className="text-xs text-soft">{skill.category}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-soft">{skill.description}</p>
      {level !== null && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-soft">
            <span>Proficiency</span>
            <span>{level}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-soft">
            <div
              className="skill-bar h-full rounded-full bg-gradient-to-r from-brand-400 to-indigo-500"
              style={{ width: 0 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
