import { Reveal } from "./Reveal";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-[rgb(var(--border))] bg-soft px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-400">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base text-soft sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
