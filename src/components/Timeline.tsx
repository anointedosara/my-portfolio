"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Experience } from "@/types";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-brand-400 via-indigo-500 to-transparent md:left-1/2" />
      <div className="space-y-10">
        {items.map((item, i) => {
          const isWork = item.type === "work";
          const Icon = isWork ? Briefcase : GraduationCap;
          const left = i % 2 === 0;
          return (
            <motion.div
              key={item._id || `${item.role}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
              }`}
            >
              <span
                className={`absolute top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-indigo-500 text-white shadow-lg ring-4 ring-[rgb(var(--bg))] left-0 md:left-auto ${
                  left ? "md:-right-4" : "md:-left-4"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="card card-hover text-left">
                <span className="chip">{item.period}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{item.role}</h3>
                <p className="text-sm font-medium text-brand-400">{item.company}</p>
                <p className="mt-2 text-sm text-soft">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
