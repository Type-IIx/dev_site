import { Router } from "express";
import { AlgebraicCaptcha } from "algebraic-captcha";
import { prisma } from "../helper";
import { string } from "zod";





const CaptchaController = Router();

const algebraicCaptcha = new AlgebraicCaptcha({
    width: 200,
    height: 150,
    background: '#ffffff',
    noise: 4,
    minValue: 1,
    maxValue: 10,
    operandAmount: 1,
    operandTypes: ['+', '-'],
    mode: 'equation',
    targetSymbol: '?'
});



CaptchaController.get("/generate", async (req, res, next) => {
    try {
        const { image, answer } = await algebraicCaptcha.generateCaptcha();
        const tempCap = await prisma.captcha.create({
            data: {
                answer: answer.toString()
            }
        })
        res.status(200).json({
            image,
            capId: tempCap.id
        })
    } catch (e) {
        res.status(500).json({ failed: true })
    }
})

export { CaptchaController }