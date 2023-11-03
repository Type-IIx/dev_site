import type { NextApiRequest, NextApiResponse } from 'next';
import yahooFinance from "yahoo-finance2"
import { Quote, QuoteResponseArray } from 'yahoo-finance2/dist/esm/src/modules/quote';


const symbols = [
	"GBPUSD=X",
	"EURUSD=X",
	"CADUSD=X",
	"BTC-USD"
]

type Response = {
    price: number;
    symbol: string;
}

const formatResp = (data : QuoteResponseArray) =>  {
	let res = data.map((e,i) => {
		return {
			price : e.regularMarketPrice,
			symbol : e.symbol
		}
	})
	return res

}
 
export default async function handler(req : NextApiRequest,resp : NextApiResponse<Response[]>) {
	let data = await yahooFinance.quote(symbols);
	
	resp.status(200).json(formatResp(data))
}