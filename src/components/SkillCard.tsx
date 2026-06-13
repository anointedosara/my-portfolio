"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/types";
import { SkillIcon } from "./SkillIcon";

export function SkillCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="card card-hover group"
    >
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-400/15 to-indigo-500/15 text-brand-400 transition-transform duration-300 group-hover:scale-110">
          <SkillIcon name={skill.icon} className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display font-semibold">{skill.name}</h3>
          <span className="text-xs text-soft">{skill.category}</span>
        </div>
      </div>
      <p className="mt-4 text-sm text-soft">{skill.description}</p>
      {typeof skill.level === "number" && (
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-soft">
            <span>Proficiency</span>
            <span>{skill.level}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-soft">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-indigo-500"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
