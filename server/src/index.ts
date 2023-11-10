import { PrismaClient } from "@prisma/client";
import express from "express"
import cors from "cors"
import { BlogController } from "../controllers/Blog.controller";



const db = new PrismaClient();


const app = express()

app.use(express.json())

app.use(cors())

app.use("/api/blog",BlogController);


app.listen(3030, () => {
    console.log(`Server running on http://localhost:3030`);
  });