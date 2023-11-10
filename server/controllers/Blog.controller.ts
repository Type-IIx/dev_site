import { Router } from "express";
import { getToken } from "next-auth/jwt";
import { authenticateToken } from "../middleware/verifier";
import { CustomRequest } from "../types";




const BlogController = Router();



BlogController.get("/test", async (req,res,next) => {
    try{
        const myreq = req as CustomRequest;
        console.log("stating treatement")
        authenticateToken(req as CustomRequest ,res,next);
        /* const token = await getToken({req});
        req.headers['authorization']
        console.log("token here");
        console.log(token)
        
        res.status(200).json({success : true}) */
        console.log("user here")
        console.log(myreq.user)
        res.status(200).json({success : true})
    }catch{
        return res.status(500)
    }
})


export {BlogController}