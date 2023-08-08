import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModels.js";

export const getAllJobs = async (req, res, next) => {
  // console.log(req);
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
    const error = new Error("Job not found for providing id");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res.status(StatusCodes.OK).json({ job: job });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { newCompany, newPosition } = req.body;
  const obj = { newCompany, newPosition };

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  //remember that req.body is an object that contains all request data
  //By default findByIdAndUpdate returns the previous all jobs, since i want to get the update done i passed { new: true } configuration
  if (!updatedJob) {
    const error = new Error();
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res
    .status(StatusCodes.CREATED)
    .json({ message: "job edited", job: updatedJob });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    const error = new Error("Job not found for providing id");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res.status(StatusCodes.OK).json({ message: "job deleted", job: removedJob });
};
