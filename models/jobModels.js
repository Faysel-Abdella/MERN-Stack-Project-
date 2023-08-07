import mongoose from "mongoose";

import { JOB_STATUS, JOB_TYPE } from "../util/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.PART_TIME,
    },
    jobLocation: {
      type: String,
      default: "My city",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
