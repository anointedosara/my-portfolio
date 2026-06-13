"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function StatCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = value.match(/(\d+)(.*)/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplay(`${current}${suffix}`);
    }, 35);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="card text-center">
      <div className="font-display text-3xl font-bold gradient-text sm:text-4xl">{display}</div>
      <div className="mt-1 text-sm text-soft">{label}</div>
    </div>
  );
}
