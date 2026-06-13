"use client";

import { useEffect, useState } from "react";

export function Typewriter({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    if (!deleting && subIndex === words[index].length) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? 45 : 90
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words]);

  return (
    <span className={className}>
      {words[index]?.substring(0, subIndex)}
      <span className="ml-0.5 inline-block w-0.5 animate-pulse bg-brand-400 align-middle" style={{ height: "1em" }} />
    </span>
  );
}
