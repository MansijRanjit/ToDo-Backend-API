import { PaginationQuery } from "./pagination";

export interface ITask{
  title:string,
  completed?:boolean,
  createdBy:number
}

export interface QueryTask extends PaginationQuery{
  search?:string;
  completed?:boolean;
}

export interface TaskFilterQuery extends QueryTask{
  limit:number;
  offset:number;
  userId:number;
}