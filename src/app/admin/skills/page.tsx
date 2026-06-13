"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";

export default function AdminSkills() {
  return (
    <ResourceManager
      title="Skills"
      description="Manage the skills and tech stack displayed on your site."
      endpoint="/api/skills"
      primary="name"
      secondary="category"
      defaults={{
        name: "",
        description: "",
        icon: "Code2",
        level: 80,
        category: "Frontend",
        order: 0,
      }}
      fields={[
        { name: "name", label: "Name", type: "text", placeholder: "e.g. React" },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            { label: "Frontend", value: "Frontend" },
            { label: "Backend", value: "Backend" },
            { label: "Language", value: "Language" },
            { label: "Tools", value: "Tools" },
            { label: "General", value: "General" },
          ],
        },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "icon",
          label: "Icon",
          type: "select",
          options: [
            "Atom",
            "Triangle",
            "FileCode2",
            "Braces",
            "Code2",
            "Palette",
            "Network",
            "Database",
            "GitBranch",
            "Smartphone",
            "Flame",
            "Sparkles",
          ].map((v) => ({ label: v, value: v })),
        },
        { name: "level", label: "Proficiency (%)", type: "number" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
