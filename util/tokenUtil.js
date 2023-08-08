import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  //payload is a data to be part of our JWT

  //Generate a token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  //The parameter the JWToken we getting back from the cookie

  //If the verification is successful and the token is valid, the verify() method
  //return the decoded payload of the JWT. This payload contains the claims and
  //information stored within the token. If the verification fails or the token
  // is invalid, an error or an exception is be thrown, indicating that the token should not be trusted.
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
