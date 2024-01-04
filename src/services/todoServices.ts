import { Request } from "express";
import tasks from "../models/todo";
import NotFoundError from "../error/notFoundError";

export async function getTask(userId:number){
  const task = tasks.filter((task) => task.userId === userId);
  return task;
}

export async function createTask(title:string,userId:number){

  const newTask = {
    id: tasks.length + 1,
    value: title,
    completed: false,
    userId: userId || 0,
  };
  tasks.push(newTask);
  return newTask;
}

export async function updateTask(req:Request &{userId? :number}){
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(
    (task) => task.id == taskId && task.userId == req.userId
  );

  if (taskIndex === -1) {
    throw new NotFoundError("Task not found"); 
    //return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex].completed =
    req.body.completed || tasks[taskIndex].completed;

  return tasks[taskIndex];
}


export async function deleteTask(req:Request &{userId? :number}){
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(
    (task) => task.id == taskId && task.userId == req.userId
  );

  if (taskIndex === -1) {
    throw new NotFoundError("Task not found"); 
    // return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  return deleteTask;
}