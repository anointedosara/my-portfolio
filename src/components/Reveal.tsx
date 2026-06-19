"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({ children, delay = 0, y = 28, x = 0, className, once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { opacity: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(el, { opacity: 0, x, y });
      gsap.to(el, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.6,
        delay,
        ease: "power3.out",
        scrollTrigger: once
          ? { trigger: el, start: "top 92%", once: true }
          : { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
        onComplete: () => {
          // Drop the inline transform so child hover effects keep working.
          if (once) gsap.set(el, { clearProps: "transform" });
        },
      });
    },
    { scope: ref, dependencies: [delay, y, x, once] }
  );

  return (
    <div ref={ref} className={`gsap-reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}
