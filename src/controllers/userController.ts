import users from "../models/user";
import { NextFunction, Request, Response } from "express";

import * as userService from "../services/userServices"

const signup = async (req: Request, res: Response,next:NextFunction) => {
  try{
    const newUser= await userService.signup(req);

    res
      .status(200)
      .json(newUser);
  } catch (error) {
    next(error);
    //return res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req: Request, res: Response,next:NextFunction) => {

  try {
    console.log(users);
    const newUser= await userService.signin(req);

    res
      .status(200)
      .json(newUser);
  } catch (error) {
    next(error);
   // return res.status(500).json({ message: "Something went wrong" });
  }
};

export { signup, signin };
