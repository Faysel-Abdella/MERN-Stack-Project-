import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModels.js";

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithOutPassword = user.withOutPassword();
  res.status(StatusCodes.OK).json({ user: userWithOutPassword });
};

export const getApplicationStats = async (req, res, next) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users: users, jobs: jobs });
};

export const updateUser = async (req, res, next) => {
  //since i do not want to allow the user to update his password here i will remove the password from the request body
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ message: " update user" });
};
