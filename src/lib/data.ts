import { connectToDatabase, hasDatabase } from "./mongodb";
import ProjectModel from "./models/Project";
import SkillModel from "./models/Skill";
import ExperienceModel from "./models/Experience";
import { seedProjects, seedSkills, seedExperience } from "./seedData";
import type { Project, Skill, Experience } from "@/types";

function serialize<T>(docs: unknown): T[] {
  return JSON.parse(JSON.stringify(docs)) as T[];
}

function byOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getProjects(): Promise<Project[]> {
  if (!hasDatabase) return byOrder(seedProjects);
  try {
    await connectToDatabase();
    const docs = await ProjectModel.find().sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) return byOrder(seedProjects);
    return serialize<Project>(docs);
  } catch {
    return byOrder(seedProjects);
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);
  return (featured.length ? featured : projects).slice(0, 6);
}

export async function getSkills(): Promise<Skill[]> {
  if (!hasDatabase) return byOrder(seedSkills);
  try {
    await connectToDatabase();
    const docs = await SkillModel.find().sort({ order: 1 }).lean();
    if (!docs.length) return byOrder(seedSkills);
    return serialize<Skill>(docs);
  } catch {
    return byOrder(seedSkills);
  }
}

export async function getExperience(): Promise<Experience[]> {
  if (!hasDatabase) return byOrder(seedExperience);
  try {
    await connectToDatabase();
    const docs = await ExperienceModel.find().sort({ order: 1 }).lean();
    if (!docs.length) return byOrder(seedExperience);
    return serialize<Experience>(docs);
  } catch {
    return byOrder(seedExperience);
  }
}
