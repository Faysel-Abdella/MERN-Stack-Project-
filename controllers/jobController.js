import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModels.js";

export const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs: jobs });
};

export const createJob = async (req, res, next) => {
  const { company, position } = req.body;
  const job = new Job({ company, position });
  await job.save();
  //The other way is to say const job = Job.create({company, position})
  //create() will create and save to DB automatically
  res.status(StatusCodes.CREATED).json({ job: job });
};

export const getJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ message: "No job with such id" });
  }
  res.status(StatusCodes.OK).json({ job: job });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { newCompany, newPosition } = req.body;
  const obj = { newCompany, newPosition };

  const updatedjob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  //remember that req.body is an object that conatines all request data
  //By default findByIdAndUpdate returns the previuose all jobs, since i want to get the updatedone i passed { new: true } configuration
  if (!updatedjob) {
    return res.status(404).json({ message: "Job not found for edit" });
  }
  res
    .status(StatusCodes.CREATED)
    .json({ message: "job edited", job: updatedjob });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    return res.status(404).json({
      message: "Job not found for delete, please provide a correct id",
    });
  }
  res.status(StatusCodes.OK).json({ message: "job deleted", job: removedJob });
};
