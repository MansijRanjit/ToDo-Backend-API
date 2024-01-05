// const tasks = [
//   {
//     id: 1,
//     value: "work",
//     completed: false,
//     userId: 3,
//   },
//   {
//     id: 2,
//     value: "Read",
//     completed: false,
//     userId: 3,
//   },
// ];

import { ITask } from "../interface/todo";
import BaseModel from "./baseModel";

// export default tasks;

export default class TaskModel extends BaseModel{

  static async getTask(userId:number){
    return this.queryBuilder().select({
      id:"id",
      title:"title",
      completed:"completed"
    })
    .from("tasks")
    .where({created_by:userId});
  }

  static async getTaskById(id:number,userId:number){
    return this.queryBuilder().select({
      id:"id",
      title:"title",
      completed:"completed",
      createdBy:"created_by"
    })
    .from("tasks")
    .where({id,createdBy:userId})
    .first();
  }

  static async createTask(task:ITask){
    return this.queryBuilder().insert(task).table("tasks");
  }

  static async updateTask(id:number, task:ITask){
    return this.queryBuilder().update(task).table("tasks").where({id});
  }

  static async deleteTask(id:number){
    return this.queryBuilder().table("tasks").where({id}).del();
  }
}