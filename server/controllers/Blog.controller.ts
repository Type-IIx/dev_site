import { Router } from "express";
import { getToken } from "next-auth/jwt";
import { authenticateToken } from "../middleware/verifier";
import { CustomRequest } from "../types";
import { memoryUpload, upload } from "../configs/multerConfig";
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
            res.status(201).json({success : true})
        }else{
            res.status(500).json({error : true,message : "image not found"})
        }

    }catch (e){
        console.log("error here")
        console.log(e)
        res.status(500)
    }
})


BlogController.post("/import",memoryUpload.single("file"),upload.single("image"),async (req,res,next) => {
    try{
        console.log("here")
        authenticateToken(req as CustomRequest ,res,next);
        const files = req.file as Express.Multer.File
        console.log(files)
        res.status(200)
    }catch (e){
        console.log("error here")
        console.log(e)
        res.status(500)
    }
})


export {BlogController}