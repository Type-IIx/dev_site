import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { BASE_URL } from "../constants/apiInfo";
import { UserResp } from "../constants/types";

// Create a new Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL, // Replace with your backend server's base URL
});

interface SessionWithJWT extends Session {
	token : string
  }

// Create the interceptor
axiosInstance.interceptors.request.use(async (request) => {
	console.log("Interceptor called")
  // Get the session
  const session  = (await getSession()) as SessionWithJWT;

  // Add your desired session value to the request headers
  if (session) {
	console.log("session here")
	console.log(session)
    request.headers.Authorization = `Bearer ${(session.user as UserResp).token}`;
  }

  return request;
});