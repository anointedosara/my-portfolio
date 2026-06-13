import type { Metadata } from "next";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { profile } from "@/lib/seedData";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for opportunities, projects or collaborations.`,
};

export default function ContactPage() {
  const details = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  ];

  const socials = [
    { icon: Github, href: profile.social.github, label: "GitHub" },
    { icon: Linkedin, href: profile.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: profile.social.twitter, label: "Twitter" },
  ];

  return (
    <div className="pt-28 md:pt-36">
      <div className="container pb-24">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s Work <span className="gradient-text">Together</span>
            </>
          }
          subtitle="Have a project, role or idea? Send me a message and I'll respond as soon as I can."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2" x={-30} y={0}>
            <div className="space-y-4">
              {details.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <div className="card card-hover flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400/15 to-indigo-500/15 text-brand-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-soft">{label}</p>
                      <p className="truncate font-medium">{value}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={label}>{inner}</div>
                );
              })}

              <div className="card">
                <p className="text-sm font-medium">Find me online</p>
                <div className="mt-3 flex gap-3">
                  {socials.map(({ icon: Icon, href, label }) => (
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
              </div>

              <div className="card bg-gradient-to-br from-brand-400/10 to-indigo-500/10">
                <p className="font-display font-semibold">Currently available 🟢</p>
                <p className="mt-1 text-sm text-soft">
                  Open to freelance projects, full-time roles and collaborations.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" x={30} y={0}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
