import users from "../models/user";
import { Request} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_TIME, REFRESH_TOKEN_TIME } from "../constants";
import serverConfig from "../config";
import ConflictError from "../error/conflictError";
import NoContentError from "../error/noContentError";
import NotFoundError from "../error/notFoundError";
import UnauthenticatedError from "../error/unauthenticatedError";

export async function signup(username:any, email:any, password:any ) {
  
  //Fields not empty Check
  if (!username || !email || !password) {
    throw new NoContentError("Please enter all the fields");
  }

  //Existing User Check
  const isExistingUser = users.some(
    (user) => user.username == username || user.email == email
  );
  if (isExistingUser) {
    throw new ConflictError("User or email already exists");
  }

  //Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);

  //User Creation
  const newUser = {
    id: users.length + 1,
    username: username,
    password: hashedPassword,
    email: email,
    refreshToken: "",
  };

  //Generate JWT Token
  const token = jwt.sign(
    { email: newUser.email, id: newUser.id },
    serverConfig.jwt.accessTokenSecret!,
    { expiresIn: ACCESS_TOKEN_TIME }
  );

  //Generate JWT Refresh token
  const refreshToken = jwt.sign(
    { id: newUser.id },
    serverConfig.jwt.refreshTokenSecret!,
    {
      expiresIn: REFRESH_TOKEN_TIME,
    }
  );

  newUser.refreshToken = refreshToken;
  users.push(newUser);
  //console.log(users);

  return { user: newUser, token: token, refreshtoken: refreshToken };
}

export async function signin(username:any,password:any) {
  
  //Fields not empty Check
  if (!username || !password) {
    throw new NoContentError("Please enter all the fields");
  }

  //Find user by Username
  const user = users.find((u) => u.username === username);
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
