"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fires a lightweight pageview event on every route change. */
export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "pageview", path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}

export function trackEvent(type: string, label?: string, path?: string) {
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, label, path }),
    keepalive: true,
  }).catch(() => {});
}
