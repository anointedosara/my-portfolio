"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ThemeToggle } from "./ThemeToggle";

gsap.registerPlugin(useGSAP);

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Build the open/close timeline once; play forward to open, reverse to close.
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const items = overlay.querySelectorAll(".mobile-link");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(overlay, { autoAlpha: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(overlay, { autoAlpha: 1, duration: reduce ? 0 : 0.35, ease: "power2.out" })
        .from(
          items,
          {
            yPercent: 60,
            opacity: 0,
            duration: reduce ? 0 : 0.5,
            stagger: reduce ? 0 : 0.07,
            ease: "power3.out",
          },
          reduce ? 0 : "-=0.15"
        );
    },
    { scope: overlayRef }
  );

  // Drive the timeline from React state, and lock background scroll while open.
  const firstRun = useRef(true);
  useEffect(() => {
    // Skip the initial render: calling reverse() on a timeline at time 0 would
    // jump it to the end and flash the menu open. Only react to real toggles.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const t = tl.current;
    if (t) (open ? t.play() : t.reverse());
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Reset the scroll lock if the nav unmounts while open.
  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    []
  );

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent"
        }`}
      >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-blue-600 text-white">
            <Code2 className="h-5 w-5" />
          </span>
          <span>
            Anointed<span className="gradient-text">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "text-brand-400" : "text-soft hover:text-brand-400"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand-400 to-blue-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary hidden px-5 py-2 text-sm md:inline-flex">
            Hire Me
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full surface md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        </nav>
      </header>

      {/* Full-screen mobile overlay — sibling of <header> so its fixed
          positioning is relative to the viewport, not the glass header. */}
      <div
        ref={overlayRef}
        style={{ visibility: "hidden", opacity: 0 }}
        className="fixed inset-0 z-[60] flex flex-col bg-[rgb(var(--bg))] md:hidden"
      >
        <div className="container flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-display text-lg font-bold"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-blue-600 text-white">
              <Code2 className="h-5 w-5" />
            </span>
            <span>
              Anointed<span className="gradient-text">.</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full surface"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="container flex flex-1 flex-col justify-center gap-2 pb-16">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`mobile-link font-display text-3xl font-bold tracking-tight transition-colors ${
                  active ? "gradient-text" : "text-soft hover:text-brand-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mobile-link btn-primary mt-8 w-fit"
          >
            Hire Me
          </Link>
        </nav>
      </div>
    </>
  );
}
