import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import ExperienceModel from "@/lib/models/Experience";
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
    const updated = await ExperienceModel.findByIdAndUpdate(id, body, { new: true });
    if (!updated) return fail("Experience not found.", 404);
    return ok(updated);
  } catch {
    return fail("Failed to update experience.");
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
    await ExperienceModel.findByIdAndDelete(id);
    return ok({ success: true });
  } catch {
    return fail("Failed to delete experience.");
  }
}
