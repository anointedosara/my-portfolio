"use client";

import { ResourceManager } from "@/components/admin/ResourceManager";

export default function AdminExperience() {
  return (
    <ResourceManager
      title="Experience"
      description="Manage your work experience, education and certifications."
      endpoint="/api/experience"
      primary="role"
      secondary="company"
      defaults={{
        role: "",
        company: "",
        period: "",
        description: "",
        type: "work",
        order: 0,
      }}
      fields={[
        { name: "role", label: "Role / Title", type: "text", placeholder: "e.g. Frontend Developer" },
        { name: "company", label: "Company / School", type: "text" },
        { name: "period", label: "Period", type: "text", placeholder: "e.g. Jan 2023 – Present" },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: [
            { label: "Work", value: "work" },
            { label: "Education", value: "education" },
          ],
        },
        { name: "description", label: "Description", type: "textarea" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
