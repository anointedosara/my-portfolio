"use client";

import { Fragment, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate immediately on mount instead of on scroll into view. */
  immediate?: boolean;
  stagger?: number;
}

/**
 * Awwwards-style word-by-word mask reveal using GSAP.
 * Each word sits in an overflow-hidden box and slides up into place.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  immediate = false,
  stagger = 0.06,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll(".gsap-word > span");
      if (!words || !words.length) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set(words, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.set(words, { yPercent: 115, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        stagger,
        delay,
        ...(immediate
          ? {}
          : { scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } }),
      });
    },
    { scope: ref, dependencies: [text] }
  );

  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="gsap-word" aria-hidden="true">
            <span>{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
