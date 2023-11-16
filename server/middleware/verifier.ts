import { User } from "@prisma/client"
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { CustomRequest } from "../types";



export function authenticateToken(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return false
  try {
    const verifyRes = jwt.verify(token, process.env.TOKEN_SECRET as string)
    if (verifyRes) {
      req.user = verifyRes as User
      return true
    } else {
      return false
    }
  } catch {
    return false
  }


  /* jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user) => {

    if (err) return false

    req.user = user

    return true

   
  }) */
}