import { Router } from "express";
import nodemailer from "nodemailer"
import { RECEIVER_EMAIL, SMTP_EMAIL, SMTP_PASSWORD, SMTP_PORT, SMTP_SERVER } from "../src/constants.js";




const EmailController = Router()

const transporter = nodemailer.createTransport({
	host: SMTP_SERVER,
	port: SMTP_PORT,
	auth: {
		user: SMTP_EMAIL,
		pass: SMTP_PASSWORD,
	},
});

EmailController.post("/test", async (req, res, next) => {
	try {
		const message = `
		Hello this is a test mail
		`
		const options = {
			from: SMTP_EMAIL,
			to: RECEIVER_EMAIL,
			subject: "Test mail",
			text: message
		}

		const r = await transporter.sendMail(options);
		console.log(r)
		res.status(200).json({ failed: false })
	} catch (e) {
		console.log(e)
		res.status(500).json({
			failed: true
		})
	}
})


EmailController.post("/checkout", async (req, res, next) => {
	try {
		console.log("Sending email")
		const body = req.body;
		const text = `
			Book Order ${body.orderId}
			Book Name : ${body.title}
			Total : ${body.price}

			#######
			Name : ${body.name}
			Surname : ${body.surname}
			Email : ${body.email}
			Address : ${body.address}
			Country : ${body.country}
			State : ${body.state}
			Zip Code : ${body.zip}
		`

		const options = {
			from: SMTP_EMAIL,
			to: RECEIVER_EMAIL,
			subject: "Book Order Received",
			text
		}

		const r = await transporter.sendMail(options);

		res.status(200).json({ failed: false })
	} catch (e) {
		res.status(500).json({
			failed: true
		})
	}
})


/* 
{
	id: string;
	fee_string: string;
	email: string;
	duration: number;
	forum: string;
	username: string;
	referal: string | null;
	agreement: string | null;
}

*/

EmailController.post("/coaching", async (req, res, next) => {
	try {
		console.log("Sending email")
		const body = req.body;
		const text = `
			Submission ID : ${body.subId}
			Fee : ${body.fee_string}
			email : ${body.email}
			duration : ${body.duration} months
			Forum : ${body.forum}
			Username : ${body.username}
			Referal : ${body.referal}

			### Agreement ###
			${body.agreement}
 			
		`

		const options = {
			from: SMTP_EMAIL,
			to: RECEIVER_EMAIL,
			subject: "Coaching Submission",
			text
		}

		const r = await transporter.sendMail(options);

		res.status(200).json({ failed: false })
	} catch (e) {
		res.status(500).json({
			failed: true
		})
	}
})

EmailController.post("/consultancy", async (req, res, next) => {
	try {
		console.log("Sending email")
		const body = req.body;
		const text = `
			Submission ID : ${body.subId}
			Fee : ${body.fee_string}
			email : ${body.email}
			duration : ${body.duration} months
			Forum : ${body.forum}
			Username : ${body.username}
			Referal : ${body.referal}

			### Agreement ###
			${body.agreement}
 			
		`

		const options = {
			from: SMTP_EMAIL,
			to: RECEIVER_EMAIL,
			subject: "Consultancy Submission",
			text
		}

		const r = await transporter.sendMail(options);

		res.status(200).json({ failed: false })
	} catch (e) {
		res.status(500).json({
			failed: true
		})
	}
})

EmailController.post("/authors", async (req, res, next) => {
	try {
		console.log("Sending email")
		const body = req.body;
		const text = `
			Submission ID : ${body.subId}
			Fee : ${body.fee_string}
			email : ${body.email}
			authorships : ${body.authorships} months
			Website : ${body.website}
			Intent : ${body.intent}

			### Subject ###
			${body.subject}

			### Agreement ###
			${body.agreement}
 			
		`

		const options = {
			from: SMTP_EMAIL,
			to: RECEIVER_EMAIL,
			subject: "Authors Submission",
			text
		}

		const r = await transporter.sendMail(options);

		res.status(200).json({ failed: false })
	} catch (e) {
		res.status(500).json({
			failed: true
		})
	}

})


EmailController.post("/support", async (req, res, next) => {
	try {
		console.log("Sending email")
		const body = req.body;
		const text = `
			Name : ${body.name}
			Email : ${body.email}
			Subject : ${body.subject}

			### Message ###
			${body.message}
 			
		`

		const options = {
			from: SMTP_EMAIL,
			to: RECEIVER_EMAIL,
			subject: "Support Ticket",
			text
		}

		const r = await transporter.sendMail(options);

		res.status(200).json({ failed: false })
	} catch (e) {
		res.status(500).json({
			failed: true
		})
	}

})




export { EmailController }