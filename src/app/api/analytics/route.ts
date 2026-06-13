import { NextRequest } from "next/server";
import { connectToDatabase, hasDatabase } from "@/lib/mongodb";
import AnalyticsModel from "@/lib/models/Analytics";
import { ok, fail, requireAdmin, requireDatabase } from "@/lib/apiHelpers";

// Public: record an analytics event (pageview / project_click / cv_download).
export async function POST(req: NextRequest) {
  if (!hasDatabase) return ok({ stored: false });
  try {
    const body = await req.json().catch(() => ({}));
    const type = body.type;
    if (!["pageview", "project_click", "cv_download", "contact_submit"].includes(type)) {
      return ok({ stored: false });
    }
    await connectToDatabase();
    await AnalyticsModel.create({ type, path: body.path || "", label: body.label || "" });
    return ok({ stored: true });
  } catch {
    return ok({ stored: false });
  }
}

// Admin: aggregated analytics summary.
export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  const dbErr = requireDatabase();
  if (dbErr) return dbErr;

  try {
    await connectToDatabase();
    const [pageviews, projectClicks, cvDownloads, contactSubmits, topProjects] =
      await Promise.all([
        AnalyticsModel.countDocuments({ type: "pageview" }),
        AnalyticsModel.countDocuments({ type: "project_click" }),
        AnalyticsModel.countDocuments({ type: "cv_download" }),
        AnalyticsModel.countDocuments({ type: "contact_submit" }),
        AnalyticsModel.aggregate([
          { $match: { type: "project_click" } },
          { $group: { _id: "$label", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 5 },
        ]),
      ]);

    return ok({ pageviews, projectClicks, cvDownloads, contactSubmits, topProjects });
  } catch {
    return fail("Failed to load analytics.");
  }
}
