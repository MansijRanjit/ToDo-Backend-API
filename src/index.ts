import express from "express";

import userRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";

const app = express();

const PORT=3030;

app.use(express.json());
app.use("/users",userRouter);
app.use("/todo",todoRouter);

app.listen(PORT,()=>{
  console.log(`Server is listening on port: ${PORT}`);  
});