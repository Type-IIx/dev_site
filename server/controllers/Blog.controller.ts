import { Router } from "express";
import { getToken } from "next-auth/jwt";
import { authenticateToken } from "../middleware/verifier";
import { CustomRequest } from "../types";
import { upload } from "../configs/multerConfig";
import { prisma } from "../helper";




const BlogController = Router();

interface BodyDataT {
    title : string;
    content : string;
}

BlogController.post("/create",upload.single("image"),async (req,res,next) => {
    try{
        const myreq = req as CustomRequest;
        authenticateToken(req as CustomRequest ,res,next);
        const body : BodyDataT = req.body;
        const file = req.file as Express.Multer.File
        if (file){
            const relative_path = "/uploads/"+file.filename;
            const url = "/images/"+file.filename;
            const temp = {
                filename : file.filename,
                physicalPath : relative_path,
                fileUrl : url
            }
            const dbData = {...body,...temp};
            const p = await prisma.post.create({
                data : dbData
            })
            return res.status(201).json(p)
        }else{
            return res.status(500).json({error : true,message : "image not found"})
        }

    }catch{
        return res.status(500)
    }
})


export {BlogController}