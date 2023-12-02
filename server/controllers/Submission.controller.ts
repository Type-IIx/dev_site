import { Router } from "express";
import { EMAIL_URL, prisma } from "../helper";
import { FormDataAuthors, FormDataCoaching, FormDataConsultancy } from "@prisma/client";
import axios from "axios";




const SubmissionController = Router();

interface SupportBodyT {
    name : string;
    email : string;
    subject : string;
    message : string;
}

SubmissionController.get("/coaching/all", async (req, res, next) => {
    try {
        const coachings = await prisma.formDataCoaching.findMany();
        res.status(200).json(coachings)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/coaching/create", async (req, res, next) => {
    try {
        const body = req.body as FormDataCoaching;
        const coaching = await prisma.formDataCoaching.create({
            data: body
        })
        const url = EMAIL_URL+"email/coaching"
		console.log("Email url is ",url)
        const newBody = {
            subId : coaching.id,
            ...body
        }
		/* const resp = await axios.post(url,newBody)
		if (resp.status === 200){
			res.status(200).json(coaching)
		}else{
			res.status(500).json({
				failed : true
			})
		}   */ 
        res.status(200).json(coaching)  
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


SubmissionController.get("/consultancy/all", async (req, res, next) => {
    try {
        const consultancys = await prisma.formDataConsultancy.findMany();
        res.status(200).json(consultancys)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/consultancy/create", async (req, res, next) => {
    try {
        const body = req.body as FormDataConsultancy;
        const consultancy = await prisma.formDataConsultancy.create({
            data: body
        })
        const url = EMAIL_URL+"email/consultancy"
		console.log("Email url is ",url)
        const newBody = {
            subId : consultancy.id,
            ...body
        }
		/* const resp = await axios.post(url,newBody)
		if (resp.status === 200){
			res.status(200).json(consultancy)
		}else{
			res.status(500).json({
				failed : true
			})
		}  */
        res.status(200).json(consultancy)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.get("/authors/all", async (req, res, next) => {
    try {
        const authors = await prisma.formDataAuthors.findMany();
        res.status(200).json(authors)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/authors/create", async (req, res, next) => {
    try {
        const body = req.body as FormDataAuthors;
        const authors = await prisma.formDataAuthors.create({
            data: body
        })
        const url = EMAIL_URL+"email/authors"
		console.log("Email url is ",url)
        const newBody = {
            subId : authors.id,
            ...body
        }
		/* const resp = await axios.post(url,newBody)
		if (resp.status === 200){
			res.status(200).json(authors)
		}else{
			res.status(500).json({
				failed : true
			})
		} */
        res.status(200).json(authors)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/support", async (req, res, next) => {
    try {
        const body = req.body as SupportBodyT;
        const url = EMAIL_URL+"email/support"
		console.log("Email url is ",url)
		/* const resp = await axios.post(url,body)
		if (resp.status === 200){
			res.status(200).json(body)
		}else{
			res.status(500).json({
				failed : true
			})
		} */
        res.status(200).json(body)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


export { SubmissionController }