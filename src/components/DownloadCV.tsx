"use client";

import { Download } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";

export function DownloadCV({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("cv_download", "Resume page")}
      className="btn-primary"
    >
      <Download className="h-4 w-4" /> Download CV
    </a>
  );
}
