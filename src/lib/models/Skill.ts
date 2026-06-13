import mongoose, { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    level: { type: Number, default: 80 },
    category: { type: String, default: "General" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type SkillDoc = mongoose.InferSchemaType<typeof SkillSchema>;

export default models.Skill || model("Skill", SkillSchema);
