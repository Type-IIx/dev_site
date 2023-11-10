import NextAuth, { Profile, type NextAuthOptions, Session } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import CredentialsProvider from "next-auth/providers/credentials";

import { JWT  } from "next-auth/jwt/types.js";
import { Account } from "next-auth";
import {encryptPassword} from "../../../utils/helpers"
import {  User } from "@prisma/client";
import bcrypt from "bcryptjs"
import { prisma } from "../../../utils/prismahandler";
import axios from "axios";
import { BASE_URL } from "../../../constants/apiInfo";
import { UserResp } from "../../../constants/types";


interface SessionWithJWT extends Session {
  token : string
}


export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
      session({ session, user,token }) {
        const newtoken = token;
        /* console.log("token here")
        console.log(token)
  
        console.log("session callback")
        console.log(session)
        console.log(token) */
        if (session.user) {
          (session.user as UserResp).email  = newtoken.email;       
          (session.user as UserResp).token  = newtoken.token as string;       
        }

        return session;
      },
      jwt({ token, account, user , profile }) {
        if (account) {
          console.log("Received token",user)
          token.accessToken = account.access_token
          token.id = user.id
          token.email = user.email
          token.joined = (user as UserResp).joined
          token.token = (user as UserResp).token
        }
        return token
      }
    },
    session: {
      strategy: "jwt",
    },
    /* jwt: {
      async encode({ token }) {
        console.log(token)
        return jwt.sign(token as {}, process.env.JWT_SECRET!);
      },
      async decode({ token }) {
        return jwt.verify(token!, process.env.JWT_SECRET!) as JWT;
      },
    }, */

    secret: process.env.AUTH_SECRET,
    providers: [
  
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
        },
        async authorize(credentials, req) {
          const {email ,password } = credentials as {
            email : string,
            password : string
          }
          //console.log(encryptPassword(password))
          // Add logic here to look up the user from the credentials supplied
          /* let user = await prisma.user.findUnique({
            where : {
              email : email
            }
          })
  
          if (!user){
            user = await prisma.user.findUnique({
              where : {
                email : email
              }
            })
          }
  
    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            const comparison = await bcrypt.compare(password, user.password);
            if (comparison){
              console.log("valid password")
              const u = {
                id : user.id,
                email : user.email,
                joined : user.joined
              }
              return u
            }else{
              throw Error("Email or Password incorrect")
            }           
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw Error("Email or Password incorrect")
    
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          } */
          const resp = await axios.post(BASE_URL+"login",{email,password});
          if (resp.status === 200){
            const data = await resp.data;
            console.log("Found data ")
            console.log(data)
            return data
          }else{
            throw Error("Email or Password incorrect")
          }
        }
      })
  
  
      /* DiscordProvider({
        clientId: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_CLIENT_SECRET,
      }), */
      /**
       * ...add more providers here
       *
       * Most other providers require a bit more work than the Discord provider.
       * For example, the GitHub provider requires you to add the
       * `refresh_token_expires_in` field to the Account model. Refer to the
       * NextAuth.js docs for the provider you want to use. Example:
       * @see https://next-auth.js.org/providers/github
       */
    ],
  };
  
  export default NextAuth(authOptions);