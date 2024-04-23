import { Router } from "express";
import { upload, uploadBook } from "../configs/multerConfig";
import { CustomRequest } from "../types";
import { authenticateToken } from "../middleware/verifier";
import { deleteFile, prisma } from "../helper";
import path from "path";





const BookController = Router();

interface BodyDataT {
    title: string;
    price: number;
    description: string;
    Vat : number;
}



BookController.get("/books", async (req, res, next) => {
    try {
        const books = await prisma.book.findMany({
            select: {
                id: true,
                title: true,
                price: true,
                ImageUrl: true,
                BookUrl: true,
                created: true
            }
        });
        res.status(200).json(books)

    } catch {
        res.status(500).json({ success: false })
    }
})


BookController.get("/:id", async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await prisma.book.findUnique({
            where: {
                id: Number(bookId)
            }

        })
        res.status(200).json(book)
    } catch {
        res.status(500).json({ success: false })
    }
})

BookController.get("/download/:id", async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await prisma.book.findUnique({
            where: {
                id: Number(bookId)
            }

        })
        if (book) {
            let path_ = book.BookphysicalPath
            if (path_.startsWith("/")) {
                path_ = path_.substring(1)
            }
            path_ = path.resolve(path_)
            console.log(`download file ${path_}`)
            res.download(path_);
        } else {
            res.status(500).json({ failed: true })
        }



    } catch {
        res.status(500).json({ success: false })
    }
})

BookController.post("/create", uploadBook.single("book"), async (req, res, next) => {
    try {
        const myreq = req as CustomRequest;
        const authRes = authenticateToken(req as CustomRequest, res, next);
        if (authRes) {

            const body: BodyDataT = req.body;
            body.price = Number(body.price)
            body.Vat = Number(body.Vat)
            const file = req.file as Express.Multer.File;
            let temp = {
                BookFilename: "",
                BookphysicalPath: "",
                BookUrl: ""
            }
            if (file) {
                const relative_path = "/books/" + file.filename;
                const url = "/download/" + file.filename;
                const temp = {
                    BookFilename: file.filename,
                    BookphysicalPath: relative_path,
                    BookUrl: url
                }
            }
            const dbData = { ...body, ...temp };
            const p = await prisma.book.create({
                data: dbData
            })
            res.status(201).json(p)
            /* } else {
                res.status(500).json({ error: true, message: "image not found" })
            } */
        } else {
            res.status(401).json({ authorized: false })
        }

    } catch (e) {
        console.log("error here")
        console.log(e)
        res.status(500)
    }
})


BookController.delete("/delete/:id", async (req, res, next) => {
    try {
        const authRes = authenticateToken(req as unknown as CustomRequest, res, next);
        if (authRes) {
            const bookId = req.params.id;
            if (bookId) {
                const book = await prisma.book.delete({
                    where: {
                        id: Number(bookId)
                    }
                })
                res.status(200).json(book)
            } else {
                res.status(500).json({
                    failed: true,
                    message: "Id not correct"
                })
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


BookController.post("/edit/:id", upload.single("image"), async (req, res, next) => {
    try {
        const myreq = req as CustomRequest;
        const authRes = authenticateToken(req as CustomRequest, res, next);
        if (authRes) {

            let body: BodyDataT = req.body;

            const file = req.file as Express.Multer.File
            const bookId = req.params.id;
            if (bookId) {
                const book = await prisma.book.findUniqueOrThrow({
                    where: {
                        id: Number(bookId)
                    }
                })
                if (!body.title || body.title.length === 0) {
                    body.title = book.title;
                }

                if (!body.price) {
                    body.price = book.price;
                } else {
                    body.price = Number(body.price)
                }

                if (!body.Vat) {
                    body.Vat = book.Vat;
                } else {
                    body.Vat = Number(body.Vat)
                }

                if (!body.description || body.description.length === 0) {
                    body.description = book.description;
                }

                if (file) {
                    console.log(`Deleting Old image on ${path.resolve(book.ImagephysicalPath)}`)
                    deleteFile(book.ImagephysicalPath)
                    const relative_path = "/uploads/" + file.filename;
                    const url = "/images/" + file.filename;
                    const temp = {
                        ImageFilename: file.filename,
                        ImagephysicalPath: relative_path,
                        ImageUrl: url
                    }
                    const dbData = { ...body, ...temp };
                    const p = await prisma.book.update({
                        where: {
                            id: Number(bookId)
                        },
                        data: dbData
                    })
                    res.status(200).json(p)
                } else {
                    const p = await prisma.book.update({
                        where: {
                            id: Number(bookId)
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


export { BookController }