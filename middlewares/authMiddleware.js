export const authenticateUser = async (req, res, next) => {
  console.log("User authenticated");
  next();
};
