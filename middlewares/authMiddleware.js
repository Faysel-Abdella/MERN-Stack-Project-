import { StatusCodes } from "http-status-codes";

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

  console.log(req.cookies);
  next();
};
