import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { createRouter, expressWrapper,createEdgeRouter } from "next-connect";
import { upload } from "../../configs/multerConfig";
import formidable from "formidable"
import multiparty from "multiparty"
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


export const config = {
    api: {
        bodyParser: false /* {
            sizeLimit: '10mb' // Set desired value here
        } */
    }
}

interface MulterFile {
    path: string;
    originalname: string;
}

interface NextRequestWithFile extends NextRequest {
    file?: MulterFile;
}

const router = createEdgeRouter<NextRequest,NextApiResponse>();

router.get(async (req,resp) => {
    //let session = await getServerSession((req as NextRequest),resp,authOptions);
    /* const token = await getToken({req});
    if (token){

    }
    if (/* session?.user  token){
        //console.log(session.user.email)
        console.log(token.email)
    }else{
        console.log("no user is found here")
    } */
    console.log("here")
    resp.json({success : true})
})

const uploadMiddleware = upload.single("image")

//router.use(expressWrapper(uploadMiddleware));


/* router.post(async (req,resp) => {
    console.log("received")
    //const form =  formidable({});
    //const data = await form.parse(req);
    //console.log(data)
    const form = new multiparty.Form();
    

    form.parse(req,async function (err,fields,files) {
        console.log("parsed request")
        console.log(files)
    } )  
    resp.send({status : "success"})



}) */

/* export default function handler(req : NextApiRequest, resp : NextApiResponse) {
    if (req.method === "POST") {
        console.log("received")
        const form =  formidable({});
        form.parse(req,async function (err,fields,files) {
            console.log("parsed request")
            console.log(files)
            console.log(fields)
        } ) 
        
    }else{
        resp.status(405)
    }
} */




export default router.handler({
    onNoMatch(req,res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    }
})