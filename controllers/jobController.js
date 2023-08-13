import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModels.js";

import mongoose from "mongoose";
import day from "dayjs";

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
  //Group the data in mongoDB based on status
  let stats = await Job.aggregate([
    //Get all jobs created by the current user
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    //Group them
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  //change it to one obj
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

// const defaultStats = {
//   pending: stats.pending || 0,
//   interview: stats.interview || 0,
//   declined: stats.declined || 0,
// };
// let monthlyApplications = [
//   {
//     date: "May 23",
//     count: 12,
//   },
//   {
//     date: "Jun 23",
//     count: 9,
//   },
//   {
//     date: "Jul 23",
//     count: 3,
//   },
// ];
