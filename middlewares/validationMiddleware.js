import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import Job from "../models/jobModels.js";
import { JOB_TYPE, JOB_STATUS } from "../util/constants.js";
import { hashPassword } from "../util/hashPassword.js";
import User from "../models/userModel.js";
import mongoose, { Error } from "mongoose";

//This middleware contains validate test and the function for error form validating

const withValidatorErrors = (validateValues) => {
  //The argument is the value to be tested
  //Since i have two middleware i can group theme with []
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      const errorArray = errors.array();
      if (!errors.isEmpty()) {
        const errorMessages = errorArray.map((error) => error.msg);
        const error = new Error(errorMessages);
        error.statusCode = StatusCodes.BAD_REQUEST;
        if (errorMessages[0].startsWith("no job")) {
          error.statusCode = StatusCodes.NOT_FOUND;
        }
        throw error;
      }
      next();
    },
  ];
};

export const validateJobInput = withValidatorErrors([
  body("company").notEmpty().withMessage("Company is required "),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid job status"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
  body("jobLocation").notEmpty().withMessage("Job location is required"),
]);

export const validateIdParam = withValidatorErrors([
  //Test(validate) if the provided id mongoDB id, or not
  param("id").custom(async (value, { req }) => {
    //Here i'm not testing if there is a job with the provided id
    //i'm just testing if the id is mongoDB id
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    console.log("isValid id", isValidMongoId);
    if (!isValidMongoId) {
      const error = new Error("Invalid MongoDB id");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }
    // Check if a job is exist with the provided id
    const job = await Job.findById(value);
    if (!job) {
      const error = new Error("no job with such id");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
    //Check if the user requests to this job is an admin, if is there is no problem
    //Check the user requests to this job is the owner
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId.toString() === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      const error = new Error("not authorize to access this source");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }
  }),
]);

export const validateRegisterInput = withValidatorErrors([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    //check if there is a user with the same email
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("email already exist");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5, max: 30 })
    .withMessage("password must be at least 5 character"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("location").notEmpty().withMessage("Location is required"),
]);

export const validateLoginInput = withValidatorErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("password is required"),
]);
