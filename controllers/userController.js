import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const getCurrentUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "get current user" });
};

export const getApplicationStats = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: "get application stats" });
};
export const updateUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({ message: " update user" });
};
