import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import SkillModel from "@/lib/models/Skill";
import { getSkills } from "@/lib/data";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

export async function GET() {
  const skills = await getSkills();
  return ok(skills);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    const body = await req.json();
    await connectToDatabase();
    const created = await SkillModel.create(body);
    return ok(created, 201);
  } catch {
    return fail("Failed to create skill.");
  }
}
