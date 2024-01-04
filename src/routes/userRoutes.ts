import { Router } from "express";
import { signup, signin } from "../controllers/userController";
import { validateReqBody } from "../middlewares/validator";
import { createUserSchema, loginSchema } from "../schema/userSchema";

const userRouter = Router();
userRouter.post("/signup", validateReqBody(createUserSchema),signup);

userRouter.post("/signin", validateReqBody(loginSchema),signin);

export default userRouter;
