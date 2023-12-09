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
import { convertFromUSD, formatAndShowErrors, formatMBTC, getRates } from "../../utils/helpers";

export default function Bookdetail() {
	const [bookId, setBookId] = useState(-1);
	const [loading, setLoading] = useState(true);
	const [book, setBook] = useState();
	const [formData, setFormData] = useState({
		name: "",
		surname: "",
		email: "",
		address: "",
		country: "",
		state: "",
		zip: "",
		copy: "",
	});
	const [rates, setRates] = useState(false);
	//const options = useMemo(() => countryList.getData(), []);
	const { countries } = useCountries();

	const router = useRouter();

	async function updateRates() {
		let d = await getRates();
		setRates(d);
	  }
	
	
	  // effects here
	  
	
	  useEffect(() => {
		updateRates();
		const interval = setInterval(updateRates, 15000);
		return () => clearInterval(interval);
	  }, []);

	const fethBook = async () => {
		setLoading(true);
		if (bookId !== -1) {
			console.log(`Fetching Article ${bookId}`);
			const url = BASE_URL + `book/${bookId}`;
			const res = await axios.get(url);
			if (res.status === 200) {
				const data = await res.data;
				setBook(data);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		if (router.isReady) {
			setBookId(router.query.id);
		}
	}, [router.isReady]);

	useEffect(() => {
		fethBook();
	}, [bookId]);

	const handleChange = (e) => {
		let temp = { ...formData };
		temp[e.target.name] = e.target.value;
		setFormData(temp);
	};

	const submitForm = async (e) => {
		try {
			const result = CheckoutForm.safeParse(formData);
			if (!result.success) {
				const errors = result.error.issues;
				console.log(errors);
				formatAndShowErrors(toast, errors);
			} else {
				toast.info("Submiting form now");
				const body = {
					title: book.title,
					price: book.price,
					...formData
				}
				const resp = await axios.post(BASE_URL + "checkout/confirm", body)
				if (resp.status === 200) {
					const data = await resp.data;
					toast.success("Success")
					router.push(`/success/${data.orderId}`)
				} else {
					toast.error("Failed saving checkout form")
				}
			}
		} catch (e) {
			console.log(e);
			if (e.length && e.length > 0) {
				if (e[0].code) {
					console.log(e);
					console.log(e.message);
				}
			}
		}
	};

	return (
		<>
			<Head>
				<title>Checkout</title>
			</Head>
			<Wrapper>
				{!loading && book && rates && bookId !== -1 && (
					<>
						<section className="banner-section page-title">
							<div className="auto-container">
								<div className="content">
									<h1>Checkout</h1>
								</div>
								<div className="breadcrumb-outer">
									<ul className="page-breadcrumb">
										<li>
											<a href="/">Home</a>
										</li>
										<li>
											<a href="/books">Books</a>
										</li>
										<li>
											<a href={`/bookdetails/${bookId}`}>{book.title}</a>
										</li>
										<li>Checkout</li>
									</ul>
								</div>
							</div>
						</section>

						<section className="course-detail-section">
							<div className="auto-container">
								<div className="row clearfix">
									<div className="content-column col-lg-8 col-md-12 col-sm-12">
										<div className="inner-column">
											<div className="course-info-tabs">
												<div className="course-tabs tabs-box">
													<div className="tabs-content">
														<h4 className="mb-3 display-6">
															Billing & Shipping Address
														</h4>
														<form action="">
															<div className="row">
																<div className="col-md-4 mb-3">
																	<label for="firstName">First name</label>
																	<input
																		type="text"
																		className="form-control"
																		id="firstName"
																		placeholder=""
																		name={"name"}
																		value={formData.name}
																		onChange={handleChange}
																		required
																	/>
																	<div className="invalid-feedback">
																		Valid first name is required.
																	</div>
																</div>
																<div className="col-md-4 mb-3">
																	<label for="lastName">Last name</label>
																	<input
																		type="text"
																		className="form-control"
																		id="lastName"
																		placeholder=""
																		name={"surname"}
																		value={formData.surname}
																		onChange={handleChange}
																		required
																	/>
																	<div className="invalid-feedback">
																		Valid last name is required.
																	</div>
																</div>
																<div className="col-md-4 mb-3">
																	<label for="country">Copy Type</label>
																	<select
																		className="custom-select d-block w-100"
																		id="copy"
																		required
																		name={"copy"}
																		value={formData.copy}
																		onChange={handleChange}
																	>
																		{[{
																			name: "digital"
																		}, {
																			name: "physical"
																		}
																		].map((e, i) => {
																			return (
																				<option value={e.name}>{e.name}</option>
																			);
																		})}
																	</select>
																	<div className="invalid-feedback">
																		Please select a valid country.
																	</div>
																</div>
															</div>

															<div className="mb-3">
																<label for="email">Email</label>
																<input
																	type="email"
																	className="form-control"
																	id="email"
																	placeholder="you@example.com"
																	required
																	name={"email"}
																	value={formData.email}
																	onChange={handleChange}
																/>
																<div className="invalid-feedback">
																	Please enter a valid email address for
																	shipping updates.
																</div>
															</div>

															<div className="mb-3">
																<label for="address">Address</label>
																<input
																	type="text"
																	className="form-control"
																	id="address"
																	name={"address"}
																	value={formData.address}
																	onChange={handleChange}
																	placeholder="1234 Main St"
																	required
																/>
																<div className="invalid-feedback">
																	Please enter your shipping address.
																</div>
															</div>

															{/* <div className="mb-3">
															<label for="address2">
																Address 2{" "}
																<span className="text-muted">(Optional)</span>
															</label>
															<input
																type="text"
																className="form-control"
																id="address2"
																placeholder="Apartment or suite"
															/>
														</div> */}

															<div className="row">
																<div className="col-md-5 mb-3">
																	<label for="country">Country</label>
																	<select
																		className="custom-select d-block w-100"
																		id="country"
																		required
																		name={"country"}
																		value={formData.country}
																		onChange={handleChange}
																	>
																		{countries.map((e, i) => {
																			return (
																				<option value={e.name}>{e.name}</option>
																			);
																		})}
																	</select>
																	<div className="invalid-feedback">
																		Please select a valid country.
																	</div>
																</div>
																<div className="col-md-4 mb-3">
																	<label for="state">State</label>
																	<input
																		type="text"
																		className="form-control"
																		id="state"
																		name={"state"}
																		value={formData.state}
																		onChange={handleChange}
																		placeholder="1234 Main St"
																		required
																	/>
																	<div className="invalid-feedback">
																		Please provide a valid state.
																	</div>
																</div>
																<div className="col-md-3 mb-3">
																	<label for="zip">Zip</label>
																	<input
																		type="text"
																		className="form-control"
																		id="zip"
																		name={"zip"}
																		value={formData.zip}
																		onChange={handleChange}
																		placeholder=""
																		required
																	/>
																	<div className="invalid-feedback">
																		Zip code required.
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="content-column col-lg-4 col-md-12 col-sm-12">
										<div className="inner-column">
											<ul className="list-group">
												<li className="list-group-item d-flex justify-content-between lh-condensed">
													<div>
														<p className="my-0">{book.title}</p>
													</div>
													<span className="text-muted">${book.price}</span>
												</li>
												<li className="list-group-item d-flex justify-content-between lh-condensed">
													<div>
														<p className="my-0">Shipping</p>
													</div>
													<span className="text-muted">$0</span>
												</li>
												<li className="list-group-item d-flex justify-content-between">
													<h5>Total (USD)</h5>
													<strong>${book.price}</strong>
												</li>
												<li className="list-group-item d-flex justify-content-between">
													<h5>Total (BTC)</h5>
													<strong> {convertFromUSD(rates, book.price, -1)} BTC <br /> ({formatMBTC(convertFromUSD(rates, book.price, -1))} mBTC)</strong>
												</li>
												
											</ul>
										</div>
										<button onClick={submitForm} className="checkout-btn" type="submit">
											Place Order
										</button>
									</div>
								</div>
							</div>
						</section>
					</>
				)}
			</Wrapper>
		</>
	);
}
