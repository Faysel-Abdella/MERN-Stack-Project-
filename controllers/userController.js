import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModels.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

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
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    //upload the image to cloudinary cloud
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    //delete the image from the file after uploading
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  // if the user update the image, and there is a rev imag delete the previous image from cloud
  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ message: " update user" });
};
