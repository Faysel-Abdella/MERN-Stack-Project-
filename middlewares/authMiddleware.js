import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../util/tokenUtil.js";

export const authenticateUser = async (req, res, next) => {
  // ** Step 1: Check if token cookie exist from incoming request cookies,
  //    if it does't exist response unauthenticated error

  //Since you install the cookie-parser package, you can access the cookie form incoming request, just
  //by saying req.cookie

  const { token } = req.cookies;
  if (!token) {
    const error = new Error("unauthenticated error");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  // ** Step 2: If the  token cookie exist from incoming request cookies,
  //     verify whether the JWT is valid and if it is valid, grab the userID and role

  try {
    const { userId, role } = verifyJWT(token);
    //Attach the userId and role to the req object for later use
    req.user = { userId, role };
    //the same as saying req { user: {userId, role} }
    console.log(req.user);
    next();
  } catch (err) {
    const error = new Error("unauthenticated error");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};
