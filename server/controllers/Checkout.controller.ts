import { Router } from "express";
import { EMAIL_URL, prisma } from "../helper";
import axios from "axios";




const CheckoutController = Router();

interface CheckoutDataT {
	name: string;
	surname: string;
	email: string;
	address: string;
	country: string;
	state: string;
	zip: string;
	title: string;
	price: number;
	copy: string;
}
CheckoutController.post("/confirm", async (req, res, next) => {
	try {
		console.log("Checkout controller")
		const body: CheckoutDataT = req.body;
		const co = await prisma.formDataCheckout.create({
			data: body
		})
		console.log("HERE")
		const newBody = {
			orderId: co.id,
			...body
		}
		const url = EMAIL_URL + "email/checkout"
		console.log("Email url is ", url)
		/* const resp = await axios.post(url,newBody)
		if (resp.status === 200){
			res.status(200).json(newBody);
		}else{
			res.status(500).json({
				failed : true
			})
		} */
		res.status(200).json(newBody);
	} catch (e) {
		console.log("error")
		console.log(e)
		res.status(500)
	}
})

CheckoutController.get("", async (req, res, next) => {
	try {
		const orders = await prisma.formDataCheckout.findMany({
			orderBy: {
				created: "desc"
			}
		});
		res.status(200).json(orders)
	} catch (e) {
		console.log("error")
		console.log(e)
		res.status(500)
	}
})


export { CheckoutController }