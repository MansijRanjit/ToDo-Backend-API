import NotFoundError from "../error/notFoundError";
import TaskModel from "../models/todo";

export async function getTask(userId:number){
  const task = await TaskModel.getTask(userId);
  return task;
}

export async function getTaskById(id:number,userId:number){
  const task= await TaskModel.getTaskById(id,userId);
  return task;
}

export async function createTask(title:string,userId:number){
  const newTask = {
    title: title,
    completed: false,
    createdBy: userId,
  };
  TaskModel.createTask(newTask);
  return newTask;
}

export async function updateTask(taskId:number,userId:number){
  const task = await TaskModel.getTaskById(taskId,userId);

  if (!task) {
    throw new NotFoundError("Task not found"); 
    //return res.status(404).json({ message: "Task not found" });
  }

  task.completed =!task.completed;

  await TaskModel.updateTask(taskId,task);
  return task;
}


export async function deleteTask(taskId:number,userId:number){
  const task = await TaskModel.getTaskById(taskId,userId);

  if (!task) {
    throw new NotFoundError("Task not found"); 
    // return res.status(404).json({ message: "Task not found" });
  }
  const deletedTask = await TaskModel.deleteTask(taskId);
  return deletedTask;
}