import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, required: true, ref: "Job" },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    coverLetter: { type: String, required: true },
    resumePath: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Application =
  mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);

export default Application;
