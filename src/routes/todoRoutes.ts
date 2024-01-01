import { Router } from "express";

const todoRouter= Router();

todoRouter.get("/",(req,res)=>{
  res.send("Todo Get Request");
});

todoRouter.post("/",(req,res)=>{
  res.send("Todo Post Request");
});

export default todoRouter;