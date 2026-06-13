"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";

export default function AdminProjects() {
  return (
    <ResourceManager
      title="Projects"
      description="Add, edit and remove the projects shown on your portfolio."
      endpoint="/api/projects"
      primary="title"
      secondary="description"
      defaults={{
        title: "",
        description: "",
        image: "",
        fallbackImage: "",
        tags: [],
        liveUrl: "",
        repoUrl: "",
        featured: false,
        order: 0,
      }}
      fields={[
        { name: "title", label: "Title", type: "text", placeholder: "Project name" },
        { name: "order", label: "Order", type: "number" },
        { name: "description", label: "Description", type: "textarea", placeholder: "Short summary" },
        { name: "image", label: "Image URL", type: "text", placeholder: "https://... or /images/...", full: true },
        { name: "fallbackImage", label: "Fallback Image", type: "text", placeholder: "/images/...", full: true },
        { name: "tags", label: "Tags", type: "tags", placeholder: "React, TypeScript, ..." , full: true },
        { name: "liveUrl", label: "Live URL", type: "text", placeholder: "https://..." },
        { name: "repoUrl", label: "Repo URL", type: "text", placeholder: "https://github.com/..." },
        { name: "featured", label: "Featured", type: "checkbox" },
      ]}
    />
  );
}
