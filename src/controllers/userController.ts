import users from "../models/user";
import { NextFunction, Request, Response } from "express";

import * as userService from "../services/userServices"

const signup = async (req: Request, res: Response,next:NextFunction) => {
  try{
    const { username, email, password } = req.body;

    const newUser= await userService.signup(username, email, password);

    res
      .status(200)
      .json(newUser);
  } catch (error) {
    next(error);
  }
};

const signin = async (req: Request, res: Response,next:NextFunction) => {

  try {
    const { username, password } = req.body;
    console.log(users);
    const newUser= await userService.signin(username,password);

    res
      .status(200)
      .json(newUser);
  } catch (error) {
    next(error);
  }
};

export { signup, signin };
