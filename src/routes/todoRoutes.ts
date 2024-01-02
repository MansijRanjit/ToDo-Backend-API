import { Router } from "express";
import { createTask, deleteTask, getTask, updateTask } from "../controllers/todoController";
import auth from "../middlewares/auth";

const todoRouter= Router();

todoRouter.get("/",auth, getTask);

todoRouter.post("/",auth, createTask);

todoRouter.delete("/:id",auth, deleteTask);

todoRouter.put("/:id",auth, updateTask);

export default todoRouter;