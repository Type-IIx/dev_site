import { Router } from "express";
import { prisma } from "../helper";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



const UserController = Router();

const encryptPassword = (pass: string) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(pass, salt);
	return hash;
};

UserController.post("/login", async (req, res, next) => {
	try {
		const { email, password } = req.body as {
			email: string,
			password: string
		}

		let user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if (!user) {
			user = await prisma.user.findUnique({
				where: {
					email: email
				}
			})
		}


		if (user) {
			// Any object returned will be saved in `user` property of the JWT
			const comparison = await bcrypt.compare(password, user.password);
			if (comparison) {
				console.log("valid password")
				let u = {
					id: user.id,
					email: user.email,
					joined: user.joined
				}
				const token = jwt.sign(u, process.env.TOKEN_SECRET as string, { expiresIn: 7 * 24 * 60 * 60 });
				const final_resp = { token, ...u }
				res.status(200).json(final_resp)
			} else {
				throw Error("Email or Password incorrect")
			}
		} else {
			// If you return null then an error will be displayed advising the user to check their details.
			throw Error("Email or Password incorrect")

			// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
		}
	} catch (e) {
		console.log(e)
		console.log("error")
		res.status(500).json({ failed: true })
	}


})

UserController.post("/initadm", async (req, res, next) => {
	try {
		const u = await prisma.user.create({
			data: {
				email: "admin@admin.com",
				password: encryptPassword("admin123")
			}
		})
		res.status(201).json(u)
	} catch (e) {
		console.log(e)
		console.log("error")
		res.status(500).json({ failed: true })
	}
})

export { UserController }