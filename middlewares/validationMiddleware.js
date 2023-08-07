import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

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

export const validateTest = withValidatorErrors([
  body("name")
    .notEmpty()
    .withMessage("Please provide the whole infos")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 character")
    .trim(),
]);

//Now in all controllers i will add this exporting function by passing my own testing logic
