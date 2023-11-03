import prisma from "../DB/db";
import myError from "../Errors/myError";
import { comparePasswords, createJWT, hashPassword } from "../Modules/auth";

export const createUser = async (req, res, next) => {
  try {
    const password = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: password,
      },
    });
    const token = createJWT(user);
    res.status(200);
    res.json({ token });
  } catch (e) {
    next(new myError("Error user didn't created", "auth"));
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username },
    });

    if (user === null){
      next(new myError("Username Incorrect", "auth"));
      return;
    }

    const isValid = await comparePasswords(req.body.password, user.password);
    if (!isValid){ 
      next(new myError("Password Incorrect", "auth"));
      return;
    }

    const token = createJWT(user);
    res.status(200);
    res.json({ token });
  } catch (e) {
    next(new myError("Error on Login", "syntaxe"));
  }
};
