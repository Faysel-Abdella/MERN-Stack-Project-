import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const register = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const location = req.body.location;

  const user = new User({
    name,
    email,
    password,
    lastName,
    location,
  });

  await user.save();
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res, next) => {
  res.send("log in");
};
