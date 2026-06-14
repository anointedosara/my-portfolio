"use client";

import { Download } from "lucide-react";
import { trackEvent } from "./AnalyticsTracker";
import { Magnetic } from "./Magnetic";

export function DownloadCV({ href }: { href: string }) {
  return (
    <Magnetic strength={0.5}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("cv_download", "Resume page")}
        className="btn-primary"
      >
        <Download className="h-4 w-4" /> Download CV
      </a>
    </Magnetic>
  );
}
