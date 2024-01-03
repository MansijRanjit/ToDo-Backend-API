import tasks from "../models/todo";
import { Request, Response } from "express";
import * as todoService from "../services/todoServices"

//Display Task
const getTask = async (req: Request & { userId?: number }, res: Response) => {
  try {
    const task= todoService.getTask(req);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Create Task
const createTask = async (
  req: Request & { userId?: number },
  res: Response
) => {
  try {
    const newTask = todoService.createTask(req);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Update Task
const updateTask = (req: Request & { userId?: number }, res: Response) => {
  
  try {
    const task = todoService.updateTask(req);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Delete Task
const deleteTask = (req: Request & { userId?: number }, res: Response) => {
  try {
    const deletedTask= todoService.deleteTask(req);

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { createTask, updateTask, deleteTask, getTask };
