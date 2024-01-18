import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { EmailController } from "../controllers/email.controller.js";



dotenv.config();



const app = express()

app.use(express.json())

app.use(cors())

app.use("/email", EmailController);


app.listen(7070, () => {
	console.log(`Server running on http://localhost:7070`);
});