import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import myError from "../Errors/myError";
import config from "../config";

export const hashPassword = (passwrd) => {
  return bcrypt.hash(passwrd, 5);
};

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    config.jwtSecret
  );
  return token;
};

export const protect = (req, res, next) => {
  const beares = req.headers.authorization;

  if (!beares) {
    next(new myError("Not authorized", "auth"));
    return;
  }

  const [, token] = beares.split(" ");
  if (!token) {
    next(new myError("Not authorized", "auth"));
    return;
  }

  try {
    const user = jwt.verify(token, config.jwtSecret);
    req.user = user;
    next();
  } catch (e) {
    next(new myError("Not authorized", "auth"));
  }
};
