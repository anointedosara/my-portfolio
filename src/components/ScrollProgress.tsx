"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollProgress() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const isAdmin = pathname?.startsWith("/admin");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || isAdmin) return;

      gsap.set(el, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(el, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    },
    { dependencies: [isAdmin] }
  );

  if (isAdmin) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-brand-400 via-blue-500 to-blue-600"
    />
  );
}
