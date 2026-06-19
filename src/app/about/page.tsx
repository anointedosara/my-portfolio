import type { Metadata } from "next";
import { Gamepad2, Film, GraduationCap, Quote, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { SkillCard } from "@/components/SkillCard";
import { StatCounter } from "@/components/StatCounter";
import { Parallax } from "@/components/Parallax";
import { getSkills } from "@/lib/data";
import { profile } from "@/lib/seedData";

export const metadata: Metadata = {
  title: "About",
  description: `Get to know ${profile.name} — ${profile.role} based in ${profile.location}.`,
};

export const revalidate = 60;

const hobbyIcons = [Gamepad2, Film, Sparkles];

export default async function AboutPage() {
  const skills = await getSkills();
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="pt-28 md:pt-36">
      <div className="container">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Know Who <span className="gradient-text">I Am</span>
            </>
          }
          subtitle={`I'm ${profile.name}, a ${profile.role} from ${profile.location}.`}
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2">
          <Reveal x={-30} y={0}>
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-400/25 to-blue-600/25 blur-xl" />
              <Parallax amount={30}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about.main.png"
                  alt={profile.name}
                  className="relative w-full rounded-3xl"
                />
              </Parallax>
            </div>
          </Reveal>

          <Reveal x={30} y={0}>
            <div className="space-y-4 text-soft">
              {profile.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-display font-semibold text-[rgb(var(--text))]">
                Beyond coding, I enjoy:
              </h3>
              <ul className="mt-3 space-y-2">
                {profile.hobbies.map((h, i) => {
                  const Icon = hobbyIcons[i % hobbyIcons.length];
                  return (
                    <li key={h} className="flex items-center gap-3 text-soft">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-400/15 text-brand-400">
                        <Icon className="h-4 w-4" />
                      </span>
                      {h}
                    </li>
                  );
                })}
              </ul>
            </div>

            <blockquote className="card mt-8 border-l-4 border-l-brand-400">
              <Quote className="h-6 w-6 text-brand-400" />
              <p className="mt-2 italic">&ldquo;{profile.quote.text}&rdquo;</p>
              <footer className="mt-2 text-sm font-medium text-soft">— {profile.quote.author}</footer>
            </blockquote>
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <StatCounter value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Skills */}
      <section id="skills" className="mt-24 scroll-mt-24 bg-soft section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="My Skillset"
            title={
              <>
                What I Can <span className="gradient-text">Do For You</span>
              </>
            }
            subtitle="A complete overview of my professional skills and proficiency levels."
          />

          {categories.map((cat) => (
            <div key={cat} className="mt-12">
              <h3 className="mb-6 flex items-center gap-3 font-display text-xl font-bold">
                <span className="h-px flex-1 bg-[rgb(var(--border))]" />
                {cat}
                <span className="h-px flex-1 bg-[rgb(var(--border))]" />
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {skills
                  .filter((s) => s.category === cat)
                  .map((skill, i) => (
                    <SkillCard key={skill._id || skill.name} skill={skill} index={i} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
