import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ProjectModel from "@/lib/models/Project";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();
    const updated = await ProjectModel.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return fail("Project not found.", 404);
    return ok(updated);
  } catch {
    return fail("Failed to update project.");
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    const { id } = await params;
    await connectToDatabase();
    await ProjectModel.findByIdAndDelete(id);
    return ok({ success: true });
  } catch {
    return fail("Failed to delete project.");
  }
}
