import {z} from "zod";


export const CoachingForm = z.object({
    email : z.string().email({message : "Invalid Email"}),
    username : z.string().min(3, {message : "Username Must be at least 3 characters long"}),
    referal : z.string().length(8,{message : "Referal code must be 8 characters long"})
})


export const AuthorForm = z.object({
    email : z.string().email({message : "Invalid Email"}),
    website : z.string().min(3,{message : "Name Must be at least 3 characters long"}), 
    subject : z.string().min(500, {message : "Must be a minimum of 500 characters"})
})