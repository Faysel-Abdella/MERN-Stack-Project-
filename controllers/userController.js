import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModels.js";

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithOutPassword = user.withOutPassword();
  res.status(StatusCodes.OK).json({ user: userWithOutPassword });
};

export const getApplicationStats = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "get application stats" });
};
export const updateUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: " update user" });
};
