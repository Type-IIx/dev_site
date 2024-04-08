import { Router } from "express";
import { prisma } from "../helper";
import { authenticateToken } from "../middleware/verifier";
import { CustomRequest } from "../types";




const OthersController = Router();


interface ForumData {
	name: string;
}

interface ReferralData {
	code: string;
}

interface OtherData {
	call: string;
	coaching: string;
	authors: string;
	consultancy: string;
}

interface AddressData {
	address : string;
}

OthersController.get("/forum", async (req, res, next) => {
	try {
		const setts = await prisma.forum.findMany();
		res.status(200).json(setts)
	} catch {
		res.status(500).json({ failed: true })
	}
})
OthersController.delete("/forum/:id", async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: { id: string } = req.params;
		console.log(body)
		if (authRes) {
			const forum = await prisma.forum.delete({
				where: {
					id: Number(body.id)
				}
			})
			res.status(200).json(forum)
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ failed: true })
	}

})

OthersController.post("/forum", async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: ForumData = req.body;
		if (authRes) {
			if (body.name) {
				const forum = await prisma.forum.create({
					data: body
				})
				res.status(201).json(forum)
			} else {
				res.status(500).json({ failed: true })

			}
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch {
		res.status(500).json({ failed: true })
	}

})

OthersController.get("/referrals", async (req, res, next) => {
	try {
		const setts = await prisma.referrals.findMany();
		res.status(200).json(setts)
	} catch {
		res.status(500).json({ failed: true })
	}
})
OthersController.delete("/referrals/:id", async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: { id: string } = req.params;
		console.log(body)
		if (authRes) {
			const forum = await prisma.referrals.delete({
				where: {
					id: Number(body.id)
				}
			})
			res.status(200).json(forum)
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ failed: true })
	}

})

OthersController.post("/referrals", async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: ReferralData = req.body;
		if (authRes) {
			if (body.code) {
				const forum = await prisma.referrals.create({
					data: body
				})
				res.status(201).json(forum)
			} else {
				res.status(500).json({ failed: true })

			}
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch {
		res.status(500).json({ failed: true })
	}

})

OthersController.get("/other", async (req, res, next) => {
	try {
		const setts = await prisma.otherSettings.findFirst();
		if (setts) {
			res.status(200).json(setts)
		} else {
			res.status(200).json({
				call: "",
				coaching: "",
				authors: "",
				consultancy: ""
			})
		}
	} catch {
		res.status(500).json({ failed: true })
	}
})

OthersController.post("/other", async (req, res, next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: OtherData = req.body;
		console.log(body)
		if (authRes) {
			const setts = await prisma.otherSettings.findFirst();
			let resp;
			if (setts) {
				resp = await prisma.otherSettings.update({
					where: {
						id: setts.id
					},
					data: body
				})
			} else {
				resp = await prisma.otherSettings.create({
					data: body
				})
			}
			res.status(200).json(resp)
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({ failed: true })
	}

})


OthersController.post("/address", async (req,res,next) => {
	try {
		const myreq = req as unknown as CustomRequest;
		const authRes = authenticateToken(myreq, res, next);
		const body: AddressData = req.body;
		if (authRes) {
			const adderssSett = await prisma.address.findFirst();
			let resp;
			if (adderssSett) {
				resp = await prisma.address.update({
					where: {
						id: adderssSett.id
					},
					data: body
				})
			} else {
				resp = await prisma.address.create({
					data: body
				})
			}
			res.status(200).json(resp)
		} else {
			res.status(401).json({ authorized: false })
		}
	} catch (e) {
		console.log(e)
		res.status(500).json({failed : true})
	}
} )

OthersController.get("/address", async (req,res,next) => {
	try {
		const myreq = req as unknown as CustomRequest;
			const adderssSett = await prisma.address.findFirst();
			let resp;
			if (!adderssSett) {
				resp = await prisma.address.create({
					data: {
						address : ""
					}
				})
			} else {
				resp = adderssSett
			}
			res.status(200).json(resp)
		
	} catch (e) {
		console.log(e)
		res.status(500).json({failed : true})
	}
})


export { OthersController }