import { connectToDatabase } from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";
import SkillModel from "@/lib/models/Skill";
import ExperienceModel from "@/lib/models/Experience";
import { seedProjects, seedSkills, seedExperience } from "@/lib/seedData";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

// Admin: seed the database with the built-in starter content.
// Only inserts collections that are currently empty so it is safe to re-run.
export async function POST() {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    await connectToDatabase();
    const result: Record<string, number> = {};

    if ((await ProjectModel.estimatedDocumentCount()) === 0) {
      await ProjectModel.insertMany(seedProjects);
      result.projects = seedProjects.length;
    }
    if ((await SkillModel.estimatedDocumentCount()) === 0) {
      await SkillModel.insertMany(seedSkills);
      result.skills = seedSkills.length;
    }
    if ((await ExperienceModel.estimatedDocumentCount()) === 0) {
      await ExperienceModel.insertMany(seedExperience);
      result.experience = seedExperience.length;
    }

    return ok({ success: true, inserted: result });
  } catch {
    return fail("Failed to seed database.", 500);
  }
}
