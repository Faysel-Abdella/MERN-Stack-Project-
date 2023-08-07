import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    job: {
      type: String,
      enum: ["interviw", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    jobLoaction: {
      type: String,
      default: "My city",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
