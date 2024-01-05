import users from "../models/user";
import { Request} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from "../constants/jwt";
import serverConfig from "../config";
import ConflictError from "../error/conflictError";
import NoContentError from "../error/noContentError";
import NotFoundError from "../error/notFoundError";
import UnauthenticatedError from "../error/unauthenticatedError";
import UserModel from "../models/user";

export async function signup(username:string, email:string, password:any ) {
  
  //Fields not empty Check
  if (!username || !email || !password) {
    throw new NoContentError("Please enter all the fields");
  }

  //Existing User Check
  const isExistingUser = await UserModel.getUserByUsername(username);

  if (isExistingUser) {
    throw new ConflictError("User or email already exists");
  }

  //Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);

  //User Creation
  const newUser = {
    id: users.length + 1,
    username: username,
    email: email,
    password: hashedPassword,
  };

  UserModel.createUser(newUser);
  return { user: newUser};
}

export async function signin(username:string,password:string) {
  
  //Fields not empty Check
  if (!username || !password) {
    throw new NoContentError("Please enter all the fields");
  }

  //Find user by Username
  const user = await UserModel.getUserByUsername(username);
  if (!user) {
    throw new NotFoundError("Invalid Username or password");
  }

  //Compare entered password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Invalid Username or password");
  }

  //Generate JWT Token
  const token = jwt.sign(
    { email: user.email, id: user.id },
    serverConfig.jwt.accessTokenSecret!,
    {
      expiresIn: ACCESS_TOKEN_TIME,
    }
  );

  //Generate JWT Refresh token
  const refreshToken = jwt.sign(
    { id: user.id },
    serverConfig.jwt.refreshTokenSecret!,
    {
      expiresIn: REFRESH_TOKEN_TIME,
    }
  );

  return { user: user, token: token, refreshtoken: refreshToken };
}
