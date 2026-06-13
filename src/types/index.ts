export interface Project {
  _id?: string;
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
}

export interface Skill {
  _id?: string;
  name: string;
  description: string;
  icon: string; // image path or lucide icon name
  level?: number; // 0-100
  category: string;
  order: number;
}

export interface Experience {
  _id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: "work" | "education";
  order: number;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

export interface AnalyticsEvent {
  _id?: string;
  type: "pageview" | "project_click" | "cv_download" | "contact_submit";
  path?: string;
  label?: string;
  createdAt?: string;
}
