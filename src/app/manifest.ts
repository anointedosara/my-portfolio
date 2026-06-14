import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anointed Osara — Portfolio",
    short_name: "Anointed Osara",
    description: "Front-End Web Developer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#11121b",
    theme_color: "#cd5ff8",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
