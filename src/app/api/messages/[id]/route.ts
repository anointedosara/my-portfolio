import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import MessageModel from "@/lib/models/Message";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    const { id } = await params;
    const body = await req.json();
    await connectToDatabase();
    const updated = await MessageModel.findByIdAndUpdate(
      id,
      { read: body.read ?? true },
      { new: true }
    );
    return ok(updated);
  } catch {
    return fail("Failed to update message.");
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
    await MessageModel.findByIdAndDelete(id);
    return ok({ success: true });
  } catch {
    return fail("Failed to delete message.");
  }
}
