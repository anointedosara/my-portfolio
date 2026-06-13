import mongoose, { Schema, model, models } from "mongoose";

const AnalyticsSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["pageview", "project_click", "cv_download", "contact_submit"],
      required: true,
    },
    path: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { timestamps: true }
);

export type AnalyticsDoc = mongoose.InferSchemaType<typeof AnalyticsSchema>;

export default models.Analytics || model("Analytics", AnalyticsSchema);
