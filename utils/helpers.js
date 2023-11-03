import axios from "axios"

const LOCAL_API = "/api/"


export const getRates = async () => {
	let resp = await axios.get(LOCAL_API + "rates")
	let data = await resp.data;
	return data;
}