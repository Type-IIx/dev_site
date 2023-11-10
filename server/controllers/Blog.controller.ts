import { Router } from "express";
import { getServerSession } from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]"



const BlogController = Router();



BlogController.get("/test", async (req,res,next) => {
    try{
        const session = await getServerSession(req,res,authOptions)
        if (session?.user){
            console.log(session.user.email)
        }else{
            console.log("user not found")
        }
        res.status(200).json({success : true})
    }catch{
        return res.status(500)
    }
})


export {BlogController}