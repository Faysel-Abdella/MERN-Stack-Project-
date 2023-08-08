import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  //payload is a data to be part of our JWT

  //Generate a token
  const token = jwt.sign(payload, "secret", {
    expiresIn: "1d",
  });
  return token;
};
