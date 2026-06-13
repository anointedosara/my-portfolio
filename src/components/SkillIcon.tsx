import {
  Atom,
  Triangle,
  FileCode2,
  Braces,
  Code2,
  Palette,
  Network,
  Database,
  GitBranch,
  Smartphone,
  Flame,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Atom,
  Triangle,
  FileCode2,
  Braces,
  Code2,
  Palette,
  Network,
  Database,
  GitBranch,
  Smartphone,
  Flame,
  Sparkles,
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] || Code2;
  return <Icon className={className} />;
}
