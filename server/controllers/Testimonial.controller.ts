import { Router } from "express";
import { deleteFile, prisma } from "../helper";
import { CustomRequest } from "../types";
import { authenticateToken } from "../middleware/verifier";
import { upload } from "../configs/multerConfig";
import path from "path";


interface TestimonialBody {
	name: string;
	content: string;
	rating: number;
}

interface EditTestimonialBody extends TestimonialBody {
	id: number;
}

const TestimonialController = Router();

TestimonialController.get("/all", async (req, res, next) => {
	try {
		const resp = await prisma.testimonials.findMany();
		res.status(200).json(resp)
	} catch {
		res.status(500).json({ failed: true })
	}
})


TestimonialController.get("/:testid", async (req, res, next) => {
	try {
		const testid = req.params.testid;
		const resp = await prisma.testimonials.findUniqueOrThrow({
			where: {
				id: Number(testid)
			}
		});
		res.status(200).json(resp)
	} catch {
		res.status(500).json({ failed: true })
	}
})

TestimonialController.post("/create", upload.single("image"), async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: TestimonialBody = req.body;
		if (authRes) {
			if (body.name) {
				const file = req.file as Express.Multer.File
				if (file) {
					const relative_path = "/uploads/" + file.filename;
					const url = "/images/" + file.filename;
					const temp = {
						filename: file.filename,
						physicalPath: relative_path,
						fileUrl: url
					}
					body.rating = Number(body.rating)
					const dbData = { ...body, ...temp };
					const p = await prisma.testimonials.create({
						data: dbData
					})
					res.status(201).json({ success: true })
				} else {
					res.status(500).json({ error: true, message: "image not found" })
				}
			} else {
				res.status(500).json({ failed: true })

			}
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({ failed: true })
	}
})

TestimonialController.delete("/delete/:testid", async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const testid = req.params.testid;
		if (authRes) {

			const test = await prisma.testimonials.delete({
				where: {
					id: Number(testid)
				}
			})
			res.status(200).json(test)

		} else {
			res.status(401).json({ authorized: false })
		}
	} catch {
		res.status(500).json({ failed: true })
	}
})

TestimonialController.post("/edit/:testid", upload.single("image"), async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: EditTestimonialBody = req.body;
		body.id = Number(body.id);
		body.rating = Number(body.rating)
		const testid = req.params.testid;
		if (authRes) {
			if (body.name) {
				const file = req.file as Express.Multer.File;
				if (file) {
					const oldTest = await prisma.testimonials.findUniqueOrThrow({
						where: {
							id: Number(testid)
						}
					})
					console.log(`Deleting Old image on ${path.resolve(oldTest.physicalPath)}`)
					deleteFile(oldTest.physicalPath)
					const relative_path = "/uploads/" + file.filename;
					const url = "/images/" + file.filename;
					const temp = {
						filename: file.filename,
						physicalPath: relative_path,
						fileUrl: url
					}
					const dbData = { ...body, ...temp };
					const p = await prisma.testimonials.update({
						where: {
							id: Number(testid)
						},
						data: dbData
					})
					res.status(200).json(p)
				} else {
					const p = await prisma.testimonials.update({
						where: {
							id: Number(testid)
						},
						data: body
					})
					res.status(200).json(p)
				}
				/* const test = await prisma.testimonials.update({
					where: {
						id: Number(testid)
					},
					data: body
				})
				res.status(200).json(test) */
			} else {
				const file = req.file as Express.Multer.File;
				if (file) {
					deleteFile("/uploads/" + file.filename)
				}
				res.status(500).json({ failed: true })

			}
		} else {
			const file = req.file as Express.Multer.File;
			if (file) {
				deleteFile("/uploads/" + file.filename)
			}
			res.status(401).json({ authorized: false })
		}
	} catch (e) {
		console.log(e)
		const file = req.file as Express.Multer.File;
		if (file) {
			deleteFile("/uploads/" + file.filename)
		}
		res.status(500).json({ failed: true })
	}
})


export { TestimonialController }