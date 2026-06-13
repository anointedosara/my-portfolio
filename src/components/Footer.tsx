"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Twitter, Mail, Phone, Code2, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/seedData";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const year = 2026;

  return (
    <footer className="relative mt-20 border-t border-[rgb(var(--border))] bg-soft">
      <div className="container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-indigo-500 text-white">
              <Code2 className="h-5 w-5" />
            </span>
            {profile.name}
          </Link>
          <p className="mt-4 max-w-xs text-sm text-soft">{profile.tagline}</p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-soft">
            Quick Links
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {["About", "Projects", "Resume", "Contact"].map((l) => (
              <li key={l}>
                <Link
                  href={`/${l.toLowerCase()}`}
                  className="text-soft transition-colors hover:text-brand-400"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-soft">
            Get in touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 text-soft transition-colors hover:text-brand-400"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-2 text-soft transition-colors hover:text-brand-400"
              >
                <Phone className="h-4 w-4" /> {profile.phone}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
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
                className="grid h-10 w-10 place-items-center rounded-full surface transition-all hover:-translate-y-1 hover:text-brand-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[rgb(var(--border))]">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-soft sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1">
            Built with Next.js, TypeScript & Tailwind
            <ArrowUpRight className="h-4 w-4 text-brand-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
