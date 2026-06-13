import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";
import { getProjects } from "@/lib/data";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

export async function GET() {
  const projects = await getProjects();
  return ok(projects);
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    const body = await req.json();
    await connectToDatabase();
    const created = await ProjectModel.create(body);
    return ok(created, 201);
  } catch {
    return fail("Failed to create project.");
  }
}
