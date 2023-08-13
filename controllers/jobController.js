import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModels.js";

import mongoose from "mongoose";
import dayjs from "dayjs";

export const createJob = async (req, res, next) => {
  // Add a createdBy property to the incoming request body and make the
  // value equal to the userId that we attached to the request object
  // when the user login
  req.body.createdBy = req.user.userId;

  const job = new Job(req.body);
  await job.save();
  //The other way is to say const job = Job.create({company, position})
  //create() will create and save to DB automatically
  res.status(StatusCodes.CREATED).json({ job: job });
};

export const getAllJobs = async (req, res, next) => {
  //Find only the jobs that belong to the current user(if the createdBy value is === the userId attached to the
  //request body)
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs: jobs });
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

export const showStats = async (req, res, next) => {
  const defaultStats = {
    pending: 22,
    interview: 11,
    declined: 4,
  };
  let monthlyApplications = [
    {
      date: "May 23",
      count: 12,
    },
    {
      date: "Jun 23",
      count: 9,
    },
    {
      date: "Jul 23",
      count: 3,
    },
  ];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
