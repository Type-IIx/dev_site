import { Router } from "express";
import { prisma } from "../helper";
import { authenticateToken } from "../middleware/verifier";
import { CustomRequest } from "../types";




const OthersController = Router();


interface ForumData {
	name : string;
}


interface OtherData {
	call : string;
	coaching : string;
	authors : string;
	consultancy : string;
}

OthersController.get("/forum", async  (req,res,next) => {
	try {
        const setts = await prisma.forum.findMany();
        res.status(200).json(setts)
    }catch {
        res.status(500).json({failed : true})
    }
})
OthersController.delete("/forum/:id", async (req,res,next) => {
	try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
        const body : {id : string} = req.params;
		console.log(body)
		if (authRes){
			const forum = await prisma.forum.delete({
				where : {
					id : Number(body.id)
				}
			})
			res.status(200).json(forum)
		}else {
            res.status(401).json({authorized : false})
        }
    }catch (e){
		console.log(e);
        res.status(500).json({failed : true})
    }
	
})

OthersController.post("/forum", async (req,res,next) => {
	try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
        const body : ForumData = req.body;
		if (authRes){
			if (body.name){
				const forum = await prisma.forum.create({
					data : body
				})
				res.status(201).json(forum)
			}else{
			res.status(500).json({failed : true})

			}
		}else {
            res.status(401).json({authorized : false})
        }
    }catch {
        res.status(500).json({failed : true})
    }
	
})

OthersController.get("/other", async  (req,res,next) => {
	try {
        const setts = await prisma.otherSettings.findFirst();
		if (setts){
			res.status(200).json(setts)
		}else {
			res.status(200).json({
				call : "",
				coaching : "",
				authors : "",
				consultancy : ""
			})
		}
    }catch {
        res.status(500).json({failed : true})
    }
})

OthersController.post("/other", async (req,res,next) => {
	try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
        const body : OtherData = req.body;
		console.log(body)
		if (authRes){
			const setts = await prisma.otherSettings.findFirst();
			let resp;
			if (setts){
				resp = await prisma.otherSettings.update({
					where : {
						id : setts.id
					},
					data : body
				})
			}else {
				resp = await prisma.otherSettings.create({
					data : body
				})
			}
			res.status(200).json(resp)
		}else {
            res.status(401).json({authorized : false})
        }
    }catch (e) {
		console.log(e)
        res.status(500).json({failed : true})
    }
	
})


export {OthersController}