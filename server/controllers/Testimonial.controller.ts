import { Router } from "express";
import { prisma } from "../helper";
import { CustomRequest } from "../types";
import { authenticateToken } from "../middleware/verifier";


interface TestimonialBody {
	name: string;
	content : string;
	rating : number;
}

const TestimonialController = Router();

TestimonialController.get("/all",async (req,res,next) => {
	try {
        const resp = await prisma.testimonials.findMany();
        res.status(200).json(resp)
    }catch {
        res.status(500).json({failed : true})
    }
})


TestimonialController.get("/:testid",async (req,res,next) => {
	try {
		const testid = req.params.testid;
        const resp = await prisma.testimonials.findUniqueOrThrow({
			where : {
				id : Number(testid)
			}
		});
        res.status(200).json(resp)
    }catch {
        res.status(500).json({failed : true})
    }
})

TestimonialController.post("/create",async (req,res,next) => {
	try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
        const body : TestimonialBody = req.body;
		if (authRes){
			if (body.name){
				const test = await prisma.testimonials.create({
					data : body
				})
				res.status(201).json(test)
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

TestimonialController.delete("/delete/:testid", async (req,res,next) => {
	try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
		const testid = req.params.testid;
		if (authRes){

				const test = await prisma.testimonials.delete({
					where : {
						id  : Number(testid)
					}
				})
				res.status(200).json(test)
			
		}else {
            res.status(401).json({authorized : false})
        }
    }catch {
        res.status(500).json({failed : true})
    }
})

TestimonialController.post("/edit/:testid", async (req,res,next) => {
	try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
        const body : TestimonialBody = req.body;
		const testid = req.params.testid;
		if (authRes){
			if (body.name){
				const test = await prisma.testimonials.update({
					where : {
						id : Number(testid)
					},
					data : body
				})
				res.status(200).json(test)
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


export {TestimonialController}