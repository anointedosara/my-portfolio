"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = ref.current?.querySelectorAll("[data-reveal]");
      if (!items || !items.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(items, {
        clipPath: "inset(0% 0% 100% 0%)",
        yPercent: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.13,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span
          data-reveal
          className="mb-3 inline-block rounded-full border border-[rgb(var(--border))] bg-soft px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400"
        >
          {eyebrow}
        </span>
      )}
      <h2
        data-reveal
        className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p data-reveal className="mt-4 text-base text-soft sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
