import { Router } from "express";
import { getToken } from "next-auth/jwt";
import { authenticateToken } from "../middleware/verifier";
import { CustomRequest } from "../types";
import { memoryUpload, upload } from "../configs/multerConfig";
import { deleteFile, prisma } from "../helper";
import { convertToHtml } from "../middleware/converter";
import path from "path";





const BlogController = Router();

interface BodyDataT {
    title: string;
    content: string;
}

// get all posts

BlogController.get("/blogs", async (req, res, next) => {
    try {
        const blogs = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                fileUrl: true,
                created: true
            }
        });
        res.status(200).json(blogs)

    } catch {
        res.status(500).json({ success: false })
    }
})


BlogController.get("/:id", async (req, res, next) => {
    try {
        const postId = req.params.id;
        const blog = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            }

        })
        res.status(200).json(blog)
    } catch {
        res.status(500).json({ success: false })
    }
})

BlogController.post("/create", upload.single("image"), async (req, res, next) => {
    try {
        const myreq = req as CustomRequest;
        const authRes = authenticateToken(req as CustomRequest, res, next);
        if (authRes) {

            const body: BodyDataT = req.body;
            const file = req.file as Express.Multer.File
            if (file) {
                const relative_path = "/uploads/" + file.filename;
                const url = "/images/" + file.filename;
                const temp = {
                    filename: file.filename,
                    physicalPath: relative_path,
                    fileUrl: url
                }
                const dbData = { ...body, ...temp };
                const p = await prisma.post.create({
                    data: dbData
                })
                res.status(201).json({ success: true })
            } else {
                res.status(500).json({ error: true, message: "image not found" })
            }
        } else {
            res.status(401).json({ authorized: false })
        }

    } catch (e) {
        console.log("error here")
        console.log(e)
        res.status(500)
    }
})


BlogController.post("/import", memoryUpload.single("file"), async (req, res, next) => {
    try {
        console.log("here")
        const authRes = authenticateToken(req as CustomRequest, res, next);
        console.log("Auth res is " + authRes)
        if (authRes) {
            const file = req.file as Express.Multer.File
            const data = file.buffer.toString('utf8');
            const splited = file.originalname.split(".")
            const ext = splited[splited.length - 1]
            console.log("File extension is " + ext)
            let converted = data
            if (["wiki", "txt"].includes(ext)) {
                converted = await convertToHtml(data);
            }
            const p = await prisma.post.create({
                data: {
                    content: converted
                }
            })
            res.status(200).json(p)
        } else {
            res.status(401).json({ authorized: false })
        }

    } catch (e) {
        console.log("error here")
        console.log(e)
        res.status(500)
    }
})


BlogController.post("/edit/:id", upload.single("image"), async (req, res, next) => {
    try {
        const myreq = req as CustomRequest;
        const authRes = authenticateToken(req as CustomRequest, res, next);
        if (authRes) {

            let body: BodyDataT = req.body;
            const file = req.file as Express.Multer.File
            const postId = req.params.id;
            if (postId) {
                const post = await prisma.post.findUniqueOrThrow({
                    where: {
                        id: Number(postId)
                    }
                })
                if (!body.content || body.content.length === 0) {
                    body.content = post.content;
                }

                if (file) {
                    console.log(`Deleting Old image on ${path.resolve(post.physicalPath)}`)
                    deleteFile(post.physicalPath)
                    const relative_path = "/uploads/" + file.filename;
                    const url = "/images/" + file.filename;
                    const temp = {
                        filename: file.filename,
                        physicalPath: relative_path,
                        fileUrl: url
                    }
                    const dbData = { ...body, ...temp };
                    const p = await prisma.post.update({
                        where: {
                            id: Number(postId)
                        },
                        data: dbData
                    })
                    res.status(200).json(p)
                } else {
                    const p = await prisma.post.update({
                        where: {
                            id: Number(postId)
                        },
                        data: body
                    })
                    res.status(200).json(p)
                }
            } else {
                deleteFile("/uploads/" + file.filename)
                res.status(500).json({ success: false, message: "Id not provided" })
            }
        } else {
            const file = req.file as Express.Multer.File;
            if (file) {
                deleteFile("/uploads/" + file.filename)
            }
            res.status(401).json({ authorized: false })
        }


    } catch (e) {
        console.log("error here")
        console.log(e)
        const file = req.file as Express.Multer.File;
        if (file) {
            deleteFile("/uploads/" + file.filename)
        }

        res.status(500)
    }
})

export { BlogController }