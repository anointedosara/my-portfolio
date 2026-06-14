"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, Linkedin, Twitter, Download, ArrowRight, MapPin } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { Magnetic } from "./Magnetic";
import { trackEvent } from "./AnalyticsTracker";
import { profile } from "@/lib/seedData";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line > span", { yPercent: 120, duration: 1.1, stagger: 0.12 })
        .from(
          ".hero-fade",
          { y: 26, opacity: 0, duration: 0.8, stagger: 0.09 },
          "-=0.55"
        )
        .from(
          ".hero-img-wrap",
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.12, duration: 1.3, ease: "power3.out" },
          "-=1"
        )
        .from(
          ".hero-badge",
          { y: 24, opacity: 0, scale: 0.85, duration: 0.7, stagger: 0.15 },
          "-=0.7"
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden pt-28 md:pt-36">
      <div className="aurora" />
      <div
        className="absolute inset-0 -z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--text)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--text)) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />

      <div className="container relative z-10 grid items-center gap-12 pb-16 md:grid-cols-2 md:pb-24">
        <div>
          <span className="hero-fade inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-soft px-4 py-1.5 text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for work
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="hero-line block overflow-hidden pb-1">
              <span className="block">
                Hi, I&apos;m <span className="gradient-text">{profile.firstName}</span>{" "}
                <span className="inline-block animate-[float_3s_ease-in-out_infinite]">👋</span>
              </span>
            </span>
            <span className="hero-line block overflow-hidden pb-1">
              <span className="block text-2xl text-soft sm:text-3xl lg:text-4xl">
                <Typewriter words={profile.roles} />
              </span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-base text-soft sm:text-lg">{profile.tagline}</p>

          <p className="hero-fade mt-4 inline-flex items-center gap-2 text-sm text-soft">
            <MapPin className="h-4 w-4 text-brand-400" /> {profile.location}
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
            <Magnetic strength={0.5}>
              <Link href="/projects" className="btn-primary">
                View My Work <ArrowRight className="h-4 w-4" />
              </Link>
            </Magnetic>
            <Magnetic strength={0.5}>
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("cv_download", "Hero CV")}
                className="btn-ghost"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
            </Magnetic>
          </div>

          <div className="hero-fade mt-8 flex items-center gap-3">
            {[
              { href: profile.social.github, icon: Github, label: "GitHub" },
              { href: profile.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.social.twitter, icon: Twitter, label: "Twitter" },
            ].map(({ href, icon: Icon, label }) => (
              <Magnetic key={label} strength={0.6}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full surface transition-colors hover:text-brand-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-400/30 to-indigo-500/30 blur-2xl" />
          <div className="hero-img-wrap relative overflow-hidden rounded-[2rem] border border-[rgb(var(--border))] bg-soft p-2 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.avatar}
              alt={profile.name}
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "true";
                  e.currentTarget.src = profile.avatarFallback;
                }
              }}
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>

          <div className="hero-badge absolute -left-4 top-10 glass rounded-2xl px-4 py-3 shadow-xl">
            <p className="text-xs font-medium text-soft">Experience</p>
            <p className="font-display text-lg font-bold">4+ Years</p>
          </div>
          <div className="hero-badge absolute -right-4 bottom-12 glass rounded-2xl px-4 py-3 shadow-xl">
            <p className="text-xs font-medium text-soft">Projects</p>
            <p className="font-display text-lg font-bold gradient-text">20+ Shipped</p>
          </div>
        </div>
      </div>
    </section>
  );
}
