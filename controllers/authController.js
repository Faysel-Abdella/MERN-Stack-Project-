import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";

export const register = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const location = req.body.location;
  //Make the first user to be an admin and all other users to be the default defined
  //when i create the model (role: 'user')
  const isFirstUser = (await User.countDocuments()) == 0;
  console.log(isFirstUser, typeof isFirstUser);
  req.body.role = isFirstUser ? "admin" : "user";
  const role = req.body.role;

  const user = new User({
    name,
    email,
    password,
    lastName,
    location,
    role,
  });

  await user.save();
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res, next) => {
  res.send("log in");
};
