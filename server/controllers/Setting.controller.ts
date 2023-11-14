import { Router } from "express";
import { CustomRequest } from "../types";
import { authenticateToken } from "../middleware/verifier";
import { prisma } from "../helper";






const SettingController = Router();



interface SettingData {
    url : string
}

SettingController.post("/edit/:name",async (req,res,next) => {
    try{
        const myreq = req as unknown as CustomRequest;
        const authRes = authenticateToken(myreq ,res,next);
        const body : SettingData = req.body;
        if (authRes){
            const name = req.params.name;
            if (name){
                const sett = await prisma.socials.findFirst({
                    where : {
                        name : name
                    }
                })
                if (sett) {
                    const newSett = await prisma.socials.update({
                        where : {
                            id : sett.id
                        },
                        data : {
                            url : body.url
                        }
                    })
                    res.status(200).json(newSett)
                }else {
                    const newSett = await prisma.socials.create({
                        data : {
                            name,
                            url : body.url
                        }
                    })
                    res.status(200).json(newSett)
                }

            }else{
                res.status(500).json({success:false,message : "Name not provided"})
            }
        }else {
            res.status(401).json({authorized : false})
        }
    }catch {
        res.status(500).json({failed : true})
    }


})


SettingController.get("",async (req,res,next) => {

    try {
        const setts = await prisma.socials.findMany();
        res.status(200).json(setts)
    }catch {
        res.status(500).json({failed : true})
    }


})


export {SettingController}