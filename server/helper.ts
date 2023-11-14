import { PrismaClient } from "@prisma/client";
import fs from "fs"
import path from "path";

export const prisma = new PrismaClient()


export const deleteFile = (path_ : string) => {
    try {
        // Use fs.unlinkSync to delete the file synchronously
        if (path_.startsWith("/")){
            path_ = path_.substring(1)
        }
        path_ = path.resolve(path_)
        console.log(`Deleting on path ${path_}`)
        fs.unlinkSync(path_);
        console.log(`File ${path_} deleted successfully`);
    } catch (err) {
        console.error(`Error deleting file`);
        console.log(err)
    }
}