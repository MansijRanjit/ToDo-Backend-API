import tasks from "../models/todo";
import { Request, Response } from "express";


//Display Task
const getTask = async (req: Request & { userId?: number }, res: Response) => {
  try {
    const task = tasks.filter((task) => task.userId === req.userId);
    //console.log(req.userId);
    //console.log(tasks);

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
  const { title } = req.body;

  const newTask = {
    id: tasks.length + 1,
    value: title,
    completed: false,
    userId: req.userId || 0,
  };
  try {
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Update Task
const updateTask = (req: Request & {userId?:number}, res: Response) => {
  const taskId = parseInt(req.params.id);
  try {
    const taskIndex = tasks.findIndex(
      (task) => task.id == taskId && task.userId == req.userId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    tasks[taskIndex].completed = req.body.completed || tasks[taskIndex].completed;

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//Delete Task
const deleteTask = (req: Request & { userId?: number }, res: Response) => {
  const taskId = parseInt(req.params.id);
  try {
    const taskIndex = tasks.findIndex(
      (task) => task.id == taskId && task.userId == req.userId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export { createTask, updateTask, deleteTask, getTask };