import multer, { MulterError } from "multer"
import path from 'path';


const FILE_SIZE = 50_000_000;
const DESTINATION = path.resolve("uploads")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DESTINATION); // Directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: FILE_SIZE
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new MulterError("LIMIT_UNEXPECTED_FILE"))
        }
        cb(null, true)
    },

})



const memoryStorage = multer.memoryStorage()
export const memoryUpload = multer({
    storage : memoryStorage,
    limits : {
        fileSize : FILE_SIZE
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.toLowerCase().match(/\.(wiki|txt)$/)) {
            return cb(new MulterError("LIMIT_UNEXPECTED_FILE"))
        }
        cb(null, true)
    },
})
