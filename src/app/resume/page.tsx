import type { Metadata } from "next";
import { Briefcase, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/Timeline";
import { DownloadCV } from "@/components/DownloadCV";
import { getExperience } from "@/lib/data";
import { profile } from "@/lib/seedData";

export const metadata: Metadata = {
  title: "Resume",
  description: `Work experience, education and credentials of ${profile.name}.`,
};

export const revalidate = 60;

export default async function ResumePage() {
  const experience = await getExperience();
  const work = experience.filter((e) => e.type === "work");
  const education = experience.filter((e) => e.type === "education");

  return (
    <div className="pt-28 md:pt-36">
      <div className="container pb-24">
        <SectionHeading
          eyebrow="My Credentials"
          title={
            <>
              Experience & <span className="gradient-text">Education</span>
            </>
          }
          subtitle="A detailed look at my professional journey, work experience and qualifications."
        />

        <div className="mt-8 flex justify-center">
          <DownloadCV href={profile.cv} />
        </div>

        <div className="mt-16">
          <Reveal>
            <h3 className="mb-10 flex items-center justify-center gap-3 font-display text-2xl font-bold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-400/15 text-brand-400">
                <Briefcase className="h-5 w-5" />
              </span>
              Work Experience
            </h3>
          </Reveal>
          <Timeline items={work} />
        </div>

        <div className="mt-20">
          <Reveal>
            <h3 className="mb-10 flex items-center justify-center gap-3 font-display text-2xl font-bold">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600/15 text-blue-500">
                <GraduationCap className="h-5 w-5" />
              </span>
              Education & Certifications
            </h3>
          </Reveal>
          <Timeline items={education} />
        </div>

        <div className="mt-16 flex justify-center">
          <DownloadCV href={profile.cv} />
        </div>
      </div>
    </div>
  );
}
