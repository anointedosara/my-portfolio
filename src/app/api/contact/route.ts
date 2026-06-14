import { NextRequest } from "next/server";
import { z } from "zod";
import { connectToDatabase, hasDatabase } from "@/lib/mongodb";
import MessageModel from "@/lib/models/Message";
import AnalyticsModel from "@/lib/models/Analytics";
import { ok, fail } from "@/lib/apiHelpers";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters."),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return fail(parsed.error.issues[0]?.message ?? "Invalid input.", 422);
  }

  if (!hasDatabase) {
    // Without a DB we still accept gracefully so the form works in demo mode.
    return ok({ success: true, stored: false });
  }

  try {
    await connectToDatabase();
    await MessageModel.create(parsed.data);
    await AnalyticsModel.create({ type: "contact_submit", label: parsed.data.email });
    return ok({ success: true, stored: true }, 201);
  } catch (err) {
    console.error("CONTACT_ERROR:", err);
    return fail("Could not send your message right now. Please try again later.", 500);
  }
}
