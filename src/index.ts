import { PORT } from "./constants";
import express from "express";

import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";

const app = express();

app.use(express.json());

// app.use((req,res,next)=>{
//   console.log("HTTP Method:"+req.method + " URL:" +req.url);
//   next();
// })

app.use("/users",userRouter);
app.use("/todo",todoRouter);

app.listen(PORT,()=>{
  console.log(`Server is listening on port: ${PORT}`);  
});