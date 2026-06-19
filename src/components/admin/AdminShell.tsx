"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  Briefcase,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Login page renders without the shell.
  if (pathname === "/admin/login") return <>{children}</>;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen lg:flex">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-[rgb(var(--border))] p-4 lg:hidden">
        <span className="font-display font-bold">Admin Panel</span>
        <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full surface">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "block" : "hidden"
        } border-b border-[rgb(var(--border))] bg-soft lg:sticky lg:top-0 lg:block lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r`}
      >
        <div className="flex h-full flex-col p-4">
          <div className="hidden px-2 py-4 lg:block">
            <span className="font-display text-lg font-bold">
              Admin<span className="gradient-text">.</span>
            </span>
            <p className="text-xs text-soft">Portfolio CMS</p>
          </div>

          <nav className="mt-2 flex-1 space-y-1">
            {nav.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-gradient-to-r from-brand-400 to-blue-600 text-white shadow-lg"
                      : "text-soft hover:bg-[rgb(var(--card))] hover:text-brand-400"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-[rgb(var(--border))] pt-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-soft transition-colors hover:text-brand-400"
            >
              <ExternalLink className="h-4 w-4" /> View Site
            </Link>
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-soft transition-colors hover:text-red-500"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}
