import { Router } from "express";
import { prisma } from "../helper";
import { FormDataAuthors, FormDataCoaching, FormDataConsultancy } from "@prisma/client";




const SubmissionController = Router();


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
        res.status(200).json(authors)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


export { SubmissionController }