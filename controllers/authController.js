import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

import { hashPassword } from "../util/hashPassword.js";
import { createJWT } from "../util/tokenUtil.js";

export const register = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const location = req.body.location;

  //###
  //Make the first user to be an admin and all other users to be the default defined
  //when i create the model (role: 'user')
  const isFirstUser = (await User.countDocuments()) == 0;
  console.log(isFirstUser, typeof isFirstUser);
  req.body.role = isFirstUser ? "admin" : "user";
  const role = req.body.role;
  //###
  const hashedPassword = await hashPassword(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    lastName,
    location,
    role,
  });

  await user.save();
  res.status(StatusCodes.CREATED).json({ message: "user created" });
};

export const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error("Invalid credential, no user found");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  //For bcrypt.compare(), the order is matter the first argument should be the plain text..
  if (!isMatch) {
    const error = new Error("password not match");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  // ### After the user passes all the above validation, now create a token for him and set up this token in his cookie

  const token = createJWT({ userId: user._id, role: user.role });
  //calculate the equivalent milliseconds for one day
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), //setting that our cookie will expires after one day
    secure: process.env.NODE_ENV === "production", //If the NODE_ENV environment variable is set to "production", the secure property will be
    //set to true, indicating that the cookie should only be sent over a secure connection.
  });
  res.status(StatusCodes.OK).json({ message: "user logged in" });
};

export const logout = (req, res) => {
  //i will set a d/t value for the cookie of the same name the user logged in
  res.cookie("token", "logout", {
    httpOnly: true,
    //and make this to be expires now
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
