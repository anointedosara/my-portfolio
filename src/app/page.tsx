import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillCard } from "@/components/SkillCard";
import { StatCounter } from "@/components/StatCounter";
import { getFeaturedProjects, getSkills } from "@/lib/data";
import { profile } from "@/lib/seedData";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, skills] = await Promise.all([getFeaturedProjects(), getSkills()]);
  const topSkills = skills.slice(0, 6);

  return (
    <>
      <Hero />
      <Marquee />

      {/* Stats */}
      <section className="container -mt-2 pt-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <StatCounter value={s.value} label={s.label} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About preview */}
      <section className="container section-pad">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal x={-30} y={0}>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-brand-400/20 to-indigo-500/20 blur-xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about.main.png"
                alt="About Anointed"
                className="relative w-full rounded-3xl"
              />
            </div>
          </Reveal>
          <Reveal x={30} y={0}>
            <span className="mb-3 inline-block rounded-full border border-[rgb(var(--border))] bg-soft px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400">
              About Me
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Turning ideas into <span className="gradient-text">polished web apps</span>
            </h2>
            <div className="mt-4 space-y-3 text-soft">
              <p>{profile.bio[0]}</p>
              <p>{profile.bio[1]}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <span key={i} className="chip">
                  {i}
                </span>
              ))}
            </div>
            <Link href="/about" className="btn-primary mt-8">
              More about me <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-soft section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="What I Do"
            title={
              <>
                My <span className="gradient-text">Tech Stack</span> & Skills
              </>
            }
            subtitle="The tools and technologies I use to design and build modern web experiences."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topSkills.map((skill, i) => (
              <SkillCard key={skill._id || skill.name} skill={skill} index={i} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/about#skills" className="btn-ghost">
              View all skills <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="container section-pad">
        <SectionHeading
          eyebrow="Portfolio"
          title={
            <>
              Featured <span className="gradient-text">Projects</span>
            </>
          }
          subtitle="A selection of projects I've designed and built. Hover to view live demos and source code."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <Reveal key={project._id || project.title}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="btn-primary">
            View all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-br from-brand-400/10 via-transparent to-indigo-500/10 px-6 py-14 text-center md:py-20">
            <div className="aurora opacity-60" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s build something <span className="gradient-text">great together</span>
              </h2>
              <p className="mt-4 text-soft">
                Have a project, a role, or an idea in mind? I&apos;m currently available for new
                opportunities and would love to hear from you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">
                  Get in touch <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={`mailto:${profile.email}`} className="btn-ghost">
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
