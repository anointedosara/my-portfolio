"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Download, ArrowRight, MapPin } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { trackEvent } from "./AnalyticsTracker";
import { profile } from "@/lib/seedData";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-soft px-4 py-1.5 text-sm font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            Available for work
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="gradient-text">{profile.firstName}</span>{" "}
            <span className="inline-block animate-[float_3s_ease-in-out_infinite]">👋</span>
            <br />
            <span className="text-2xl text-soft sm:text-3xl lg:text-4xl">
              <Typewriter words={profile.roles} />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-soft sm:text-lg">{profile.tagline}</p>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-soft">
            <MapPin className="h-4 w-4 text-brand-400" /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="btn-primary">
              View My Work <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("cv_download", "Hero CV")}
              className="btn-ghost"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>

          <div className="mt-8 flex items-center gap-3">
            {[
              { href: profile.social.github, icon: Github, label: "GitHub" },
              { href: profile.social.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: profile.social.twitter, icon: Twitter, label: "Twitter" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full surface transition-all hover:-translate-y-1 hover:text-brand-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-400/30 to-indigo-500/30 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[rgb(var(--border))] bg-soft p-2 shadow-2xl">
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

          {/* floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs font-medium text-soft">Experience</p>
            <p className="font-display text-lg font-bold">4+ Years</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.65 }}
            className="absolute -right-4 bottom-12 glass rounded-2xl px-4 py-3 shadow-xl"
          >
            <p className="text-xs font-medium text-soft">Projects</p>
            <p className="font-display text-lg font-bold gradient-text">20+ Shipped</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
