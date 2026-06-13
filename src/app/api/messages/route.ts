import { connectToDatabase } from "@/lib/mongodb";
import MessageModel from "@/lib/models/Message";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    await connectToDatabase();
    const docs = await MessageModel.find().sort({ createdAt: -1 }).lean();
    return ok(JSON.parse(JSON.stringify(docs)));
  } catch {
    return fail("Failed to load messages.");
  }
}
