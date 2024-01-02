import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constants";

interface DecodedToken {
  id: number;
}

const auth = (
  req: Request & { userId?: number },
  res: Response,
  next: () => void
) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY) as DecodedToken;
      req.userId = user.id;
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export default auth;
