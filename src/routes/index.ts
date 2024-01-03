import { Router } from "express";

import userRouter from "./userRoutes";
import todoRouter from "./todoRoutes";

const router= Router();

router.use("/users",userRouter);
router.use("/todo",todoRouter);

export default router;