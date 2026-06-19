"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const match = value.match(/(\d+)(.*)/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] || "" : "";
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || target === null) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(`${target}${suffix}`);
        return;
      }

      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => setDisplay(`${Math.round(counter.val)}${suffix}`),
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref, dependencies: [target, suffix] }
  );

  return (
    <div ref={ref} className="card text-center">
      <div className="font-display text-3xl font-bold gradient-text sm:text-4xl">{display}</div>
      <div className="mt-1 text-sm text-soft">{label}</div>
    </div>
  );
}
