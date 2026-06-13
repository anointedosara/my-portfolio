import mongoose, { Schema, model, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, default: "" },
    description: { type: String, default: "" },
    type: { type: String, enum: ["work", "education"], default: "work" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ExperienceDoc = mongoose.InferSchemaType<typeof ExperienceSchema>;

export default models.Experience || model("Experience", ExperienceSchema);
