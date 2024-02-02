const express=require("express");
const app=express();
const cors=require("cors");
app.use(express.json());
app.use(cors());
const connect =require("./configs/db");
const crudTodo=require("./controller/todo.controller");
const crudUser=require("./controller/user.controller");
const dotenv = require('dotenv');
dotenv.config();
app.use("/todo",crudTodo);
app.use("/user",crudUser);
app.listen(8000,async()=>{
    await connect();
    console.log(8000 , "port");
})

