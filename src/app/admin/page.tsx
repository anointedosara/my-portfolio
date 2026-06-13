"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Eye,
  MousePointerClick,
  Download,
  Inbox,
  FolderGit2,
  Wrench,
  Briefcase,
  Database,
  Loader2,
  TrendingUp,
} from "lucide-react";

interface Analytics {
  pageviews: number;
  projectClicks: number;
  cvDownloads: number;
  contactSubmits: number;
  topProjects: { _id: string; count: number }[];
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [counts, setCounts] = useState({ projects: 0, skills: 0, experience: 0, messages: 0 });
  const [dbConnected, setDbConnected] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [a, p, s, e, m] = await Promise.all([
        fetch("/api/analytics"),
        fetch("/api/projects"),
        fetch("/api/skills"),
        fetch("/api/experience"),
        fetch("/api/messages"),
      ]);
      if (a.status === 503) setDbConnected(false);
      const aData = a.ok ? await a.json() : null;
      setAnalytics(aData && !aData.error ? aData : null);
      const [pd, sd, ed, md] = await Promise.all([p.json(), s.json(), e.json(), m.ok ? m.json() : []]);
      setCounts({
        projects: Array.isArray(pd) ? pd.length : 0,
        skills: Array.isArray(sd) ? sd.length : 0,
        experience: Array.isArray(ed) ? ed.length : 0,
        messages: Array.isArray(md) ? md.length : 0,
      });
    } catch {
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const seed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Seeding failed");
      toast.success("Database seeded with your starter content!");
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Seeding failed");
    } finally {
      setSeeding(false);
    }
  };

  const statCards = [
    { label: "Page Views", value: analytics?.pageviews ?? 0, icon: Eye },
    { label: "Project Clicks", value: analytics?.projectClicks ?? 0, icon: MousePointerClick },
    { label: "CV Downloads", value: analytics?.cvDownloads ?? 0, icon: Download },
    { label: "Messages", value: counts.messages, icon: Inbox },
  ];

  const contentCards = [
    { label: "Projects", value: counts.projects, icon: FolderGit2 },
    { label: "Skills", value: counts.skills, icon: Wrench },
    { label: "Experience", value: counts.experience, icon: Briefcase },
    { label: "Contact Submits", value: analytics?.contactSubmits ?? 0, icon: TrendingUp },
  ];

  if (loading) {
    return (
      <div className="grid place-items-center py-32 text-soft">
        <Loader2 className="h-7 w-7 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-soft">Welcome back — here&apos;s an overview of your portfolio.</p>
      </div>

      {!dbConnected && (
        <div className="card mb-6 border-l-4 border-l-amber-500">
          <div className="flex items-start gap-3">
            <Database className="mt-0.5 h-5 w-5 text-amber-500" />
            <div>
              <p className="font-semibold">No database connected</p>
              <p className="text-sm text-soft">
                The site is running on built-in fallback content. Set{" "}
                <code className="rounded bg-soft px-1.5 py-0.5">MONGODB_URI</code> in your{" "}
                <code className="rounded bg-soft px-1.5 py-0.5">.env.local</code> to enable saving,
                analytics and the CMS, then restart the dev server.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-400/15 text-brand-400">
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 font-display text-3xl font-bold">{value}</div>
            <div className="text-sm text-soft">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contentCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card flex items-center gap-4 !py-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/15 text-indigo-400">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-xl font-bold">{value}</div>
              <div className="text-xs text-soft">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-lg font-bold">Most Clicked Projects</h2>
          {analytics?.topProjects?.length ? (
            <ul className="mt-4 space-y-3">
              {analytics.topProjects.map((p) => (
                <li key={p._id} className="flex items-center justify-between text-sm">
                  <span className="truncate text-soft">{p._id || "Unknown"}</span>
                  <span className="chip">{p.count} clicks</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-soft">No project clicks recorded yet.</p>
          )}
        </div>

        <div className="card">
          <h2 className="font-display text-lg font-bold">Quick Actions</h2>
          <p className="mt-1 text-sm text-soft">
            Seed your database with the built-in starter content (projects, skills & experience).
            Safe to run once — it only fills empty collections.
          </p>
          <button
            onClick={seed}
            disabled={seeding || !dbConnected}
            className="btn-primary mt-4 px-5 py-2.5 text-sm disabled:opacity-60"
          >
            {seeding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            Seed Database
          </button>
        </div>
      </div>
    </div>
  );
}
