import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { JOB_TYPE, JOB_STATUS } from "../util/constants.js";
import mongoose from "mongoose";

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
  param("id")
    .custom((value) => {
      //If this block returns true this means the id is mongoDB id, and this middleware will not throw any error
      // if return false the error will be thrown form this block with my own message
      //Here i'm not testing if there is a job with the provided id
      //i'm just testing if the id is mongoDB id
      return mongoose.Types.ObjectId.isValid(value);
    })
    .withMessage("invalid MongoDB id"),
]);

//Now in all routes i will add these exporting function by passing my own testing logic
