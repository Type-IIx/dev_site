import { Router } from "express";
import { prisma } from "../helper";
import { FormDataCoaching } from "@prisma/client";




const SubmissionController = Router();



SubmissionController.post("/coaching/create", async (req, res, next) => {
    try {
        const body = req.body as FormDataCoaching;
        const coaching = await prisma.formDataCoaching.create({
            data: body
        })
        res.status(200).json(coaching)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


export { SubmissionController }