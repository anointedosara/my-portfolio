"use client";

import { useRef } from "react";
import FastMarquee from "react-fast-marquee";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const techs = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "HTML5",
  "CSS3",
  "Git",
  "REST APIs",
  "Firebase",
];

export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  // Subtle scroll-velocity skew (skips on reduced-motion).
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const proxy = { skew: 0 };
      const setSkew = gsap.quickSetter(el, "skewX", "deg");
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-8, 8, self.getVelocity() / -260);
          gsap.to(proxy, {
            skew: v,
            duration: 0.5,
            ease: "power3",
            overwrite: true,
            onUpdate: () => setSkew(proxy.skew),
          });
        },
      });
      const tick = () => {
        if (!st.isActive) {
          proxy.skew = gsap.utils.interpolate(proxy.skew, 0, 0.08);
          setSkew(proxy.skew);
        }
      };
      gsap.ticker.add(tick);
      return () => {
        st.kill();
        gsap.ticker.remove(tick);
      };
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-[rgb(var(--border))] bg-soft py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[rgb(var(--bg))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[rgb(var(--bg))] to-transparent" />
      <FastMarquee speed={45} autoFill pauseOnHover gradient={false}>
        {techs.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center whitespace-nowrap font-display text-lg font-semibold text-soft md:text-xl"
          >
            {t}
            <span className="mx-10 text-brand-400">✦</span>
          </span>
        ))}
      </FastMarquee>
    </div>
  );
}
