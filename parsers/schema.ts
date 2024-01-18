import { z } from "zod";


export const CoachingForm = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    username: z.string(),//.min(3, {message : "Username Must be at least 3 characters long"}),
    referal: z.string()//.length(8, { message: "Referal code must be 8 characters long" })
})


export const AuthorForm = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    website: z.string().min(3, { message: "Name Must be at least 3 characters long" }),
    subject: z.string().min(50, { message: "Must be a minimum of 50 characters" }).max(1500, { message: "Must be a maximum of 1500 characters" })
})


export const CheckoutForm = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    name: z.string().min(2, { message: "Name can't be empty" }),
    surname: z.string().min(2, { message: "Surname Can't be empty" }),
    address: z.string().min(1, { message: "Address shouldn't be empty" }),
    country: z.string().min(1, { message: "Please select a country" }),
    state: z.string().min(1, { message: "Please provide the state" }),
    zip: z.string().min(1, { message: "Please provide zip code" })
})