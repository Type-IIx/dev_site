
import { NextApiRequest, NextApiResponse } from "next";
import {encryptPassword} from "../../utils/helpers"
import { prisma } from "../../utils/prismahandler";






export default async function handler(req : NextApiRequest, resp : NextApiResponse) {
    if (req.method === "POST"){
        const u = await prisma.user.create({
            data : {
                email : "admin@admin.com",
                password : encryptPassword("admin123")
            }
        })
        resp.status(201).json(u)
    }else{
        resp.status(405)
    }
}