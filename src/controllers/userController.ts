import users from "../models/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY="TODOAPI";

const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    //Fields not empty Check
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please Enter all the fields" });
    }

    //Existing User Check
    const isExistingUser = users.some((user) =>
      user.username == username || user.email == email
    );
    if (isExistingUser) {
      return res.status(400).json({ message: "User or email already exists" });
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //User Creation
    const newUser = {
      id: users.length + 1,
      username: username,
      password: hashedPassword,
      email: email,
    };
    users.push(newUser);
    //console.log(users);
    
    //Generate JWT Token
    const token = jwt.sign({email : newUser.email, id:newUser.id},SECRET_KEY);

    res.status(200).json({user:newUser, token:token });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req: Request, res: Response) => {
  const {username,password}=req.body;

  try {
    //Fields not empty Check
    if(!username || !password){
      return res.status(400).json({message:"Please enter all the fields"});
    }

    //Find user by Username
    const user = users.find((u)=>u.username === username);
    if (!user) {
      return res.status(404).json({ message: "Invalid Username or password" });
    }

    //Compare entered password
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(404).json({ message: "Invalid Username or password" });
    }

    //Generate JWT Token
    const token = jwt.sign({email : user.email, id:user.id},SECRET_KEY);

    res.status(200).json({user:user, token:token });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { signup, signin };
