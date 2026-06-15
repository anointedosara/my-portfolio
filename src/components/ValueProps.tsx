import Link from "next/link";
import { Layers, Rocket, ShieldCheck, ArrowRight, Download } from "lucide-react";
import { Reveal } from "./Reveal";
import { profile } from "@/lib/seedData";

const items = [
  {
    icon: Layers,
    question: "What I build",
    title: "Full-stack web apps",
    body: "Storefronts, analytics dashboards and booking platforms — built end-to-end with Next.js, TypeScript, MongoDB and Tailwind CSS.",
  },
  {
    icon: Rocket,
    question: "Can I build real apps?",
    title: "20+ shipped · 7 live",
    body: "Real, deployed products you can open and click through right now — not mockups. Each one ships with a live demo and its source code.",
    href: "/projects",
    cta: "See them live",
  },
  {
    icon: ShieldCheck,
    question: "Can you trust me with a job?",
    title: "Proven & available",
    body: "3+ years with real team experience (Cloudolle — UK, Zuri). I write clean, reusable code and use an AI-first workflow to ship fast. Available now.",
    href: profile.cv,
    cta: "Download CV",
    external: true,
  },
];

export function ValueProps() {
  return (
    <section className="container pt-16 md:pt-20">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.question} delay={i * 0.1} className="h-full">
            <div className="card card-hover flex h-full flex-col">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-400/15 to-indigo-500/15 text-brand-400">
                <item.icon className="h-6 w-6" />
              </span>
              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-brand-400">
                {item.question}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm text-soft">{item.body}</p>
              {item.href &&
                (item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-all hover:gap-2.5"
                  >
                    {item.cta} <Download className="h-4 w-4" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-400 transition-all hover:gap-2.5"
                  >
                    {item.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
