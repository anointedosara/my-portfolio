"use client";

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
  "Framer Motion",
  "Firebase",
];

export function Marquee() {
  const list = [...techs, ...techs];
  return (
    <div className="marquee relative overflow-hidden border-y border-[rgb(var(--border))] bg-soft py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[rgb(var(--bg))] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[rgb(var(--bg))] to-transparent" />
      <div className="marquee-track gap-10">
        {list.map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-lg font-semibold text-soft md:text-xl"
          >
            {t}
            <span className="mx-5 text-brand-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
