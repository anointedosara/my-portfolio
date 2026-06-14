import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Magnetic } from "@/components/Magnetic";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of web development projects built with React, Next.js and more.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pt-28 md:pt-36">
      <div className="container pb-24">
        <SectionHeading
          eyebrow="My Work"
          title={
            <>
              Check Out Some of <span className="gradient-text">My Works</span>
            </>
          }
          subtitle="Here are projects I've designed and built recently. Filter by technology to explore."
        />

        <div className="mt-14">
          <ProjectsGrid projects={projects} />
        </div>

        <div className="mt-16 text-center">
          <p className="text-soft">Want to see more or discuss a collaboration?</p>
          <Magnetic strength={0.5} className="mt-4">
            <Link href="/contact" className="btn-primary">
              Let&apos;s talk <ArrowRight className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}
