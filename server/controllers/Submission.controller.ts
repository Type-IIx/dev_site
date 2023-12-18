import { Router } from "express";
import { EMAIL_URL, prisma } from "../helper";
import { FormDataAuthors, FormDataCoaching, FormDataConsultancy } from "@prisma/client";
import axios from "axios";




const SubmissionController = Router();

interface SupportBodyT {
    name: string;
    email: string;
    subject: string;
    message: string;
}
interface CaptchaBodyT {
    id: string;
    answer: string;
}

const validateCaptcha = async (resp: CaptchaBodyT) => {
    console.log(resp)
    const t = await prisma.captcha.findUnique({
        where: {
            id: resp.id
        }
    })
    if (t) {
        if (t.answer === resp.answer) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

const validateReferral = async (code: string) => {
    if (code.length === 0) {
        return true;
    }
    const t = await prisma.referrals.findFirst({
        where: {
            code
        }
    })
    if (t) {
        return true;
    } else {
        return false;
    }
}


SubmissionController.get("/coaching/all", async (req, res, next) => {
    try {
        const coachings = await prisma.formDataCoaching.findMany({
            orderBy: {
                created: "desc"
            }
        });
        res.status(200).json(coachings)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/coaching/create", async (req, res, next) => {
    try {
        const { captcha, body } = req.body as { captcha: CaptchaBodyT, body: FormDataCoaching };
        const res_captcha = await validateCaptcha(captcha);
        if (res_captcha) {
            const res_referral = await validateReferral(body.referal as string);
            if (res_referral) {
                const coaching = await prisma.formDataCoaching.create({
                    data: body
                })
                const url = EMAIL_URL + "email/coaching"
                console.log("Email url is ", url)
                const newBody = {
                    subId: coaching.id,
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
            } else {
                res.status(500).json({
                    success: false,
                    reason: "Referral Code Invalid"
                })
            }

        } else {
            res.status(500).json({
                success: false,
                reason: "Captcha Failed"
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


SubmissionController.get("/consultancy/all", async (req, res, next) => {
    try {
        const consultancys = await prisma.formDataConsultancy.findMany({
            orderBy: {
                created: "desc"
            }
        });
        res.status(200).json(consultancys)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/consultancy/create", async (req, res, next) => {
    try {
        //const body = req.body as FormDataConsultancy;
        const { captcha, body } = req.body as { captcha: CaptchaBodyT, body: FormDataConsultancy };
        const res_captcha = await validateCaptcha(captcha);
        if (res_captcha) {
            const res_referral = await validateReferral(body.referal as string);
            if (res_referral) {
                const coaching = await prisma.formDataCoaching.create({
                    data: body
                })
                const consultancy = await prisma.formDataConsultancy.create({
                    data: body
                })
                const url = EMAIL_URL + "email/consultancy"
                console.log("Email url is ", url)
                const newBody = {
                    subId: consultancy.id,
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
            } else {
                res.status(500).json({
                    success: false,
                    reason: "Referral Code Invalid"
                })
            }

        } else {
            res.status(500).json({
                success: false,
                reason: "Captcha Failed"
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.get("/authors/all", async (req, res, next) => {
    try {
        const authors = await prisma.formDataAuthors.findMany({
            orderBy: {
                created: "desc"
            }
        });
        res.status(200).json(authors)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.post("/authors/create", async (req, res, next) => {
    try {
        //const body = req.body as FormDataAuthors;
        const { captcha, body } = req.body as { captcha: CaptchaBodyT, body: FormDataAuthors };
        const res_captcha = await validateCaptcha(captcha);
        if (res_captcha) {
            const authors = await prisma.formDataAuthors.create({
                data: body
            })
            const url = EMAIL_URL + "email/authors"
            console.log("Email url is ", url)
            const newBody = {
                subId: authors.id,
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
        } else {
            res.status(500).json({
                success: false,
                reason: "Captcha Failed"
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})

SubmissionController.get("/support/all", async (req, res, next) => {
    try {
        const tickets = await prisma.formDataSupport.findMany({
            orderBy: {
                created: "desc"
            }
        });
        res.status(200).json(tickets)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


SubmissionController.post("/support", async (req, res, next) => {
    try {
        const body = req.body as SupportBodyT;
        const url = EMAIL_URL + "email/support"
        console.log("Email url is ", url)
        /* const resp = await axios.post(url,body)
        if (resp.status === 200){
            res.status(200).json(body)
        }else{
            res.status(500).json({
                failed : true
            })
        } */
        const r = await prisma.formDataSupport.create({
            data: body
        })
        res.status(200).json(body)
    } catch (e) {
        console.log(e)
        res.status(500).json({ success: false })
    }
})


export { SubmissionController }