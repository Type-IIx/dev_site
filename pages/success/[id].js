import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BASE_DOMAIN, BASE_URL } from "../../constants/apiInfo";
import axios from "axios";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";
import { useCountries } from "use-react-countries";
import { CheckoutForm } from "../../parsers/schema";
import { formatAndShowErrors } from "../../utils/helpers";

export default function Bookdetail() {
	const [bookId, setBookId] = useState(-1);
	const [loading, setLoading] = useState(true);


	const router = useRouter();



	useEffect(() => {
		if (router.isReady) {
			setBookId(router.query.id);
		}
	}, [router.isReady]);





	return (
		<>
			<Head>
				<title>Checkout</title>
			</Head>
			<Wrapper>
				{bookId !== -1 && (
					<>
						<section className="banner-section page-title">
							<div className="auto-container">
								<div className="content">
									<h1>Thank you for shopping</h1>
								</div>
								<div className="sec-title centered mt-5">
									<h3 className="">Order ID: #{bookId}</h3>
									<h4>Your Order has been placed successfully</h4>
								</div>
							</div>
						</section>
					</>
				)}
			</Wrapper>
		</>
	);
}
