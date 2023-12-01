import Head from "next/head";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import SubmissionSideBar from "../../components/AdminComps/SubmissionSideBar";
import axios from "axios";
import { BASE_URL } from "../../constants/apiInfo";
import { useEffect, useState } from "react";

export default function Formdataorders() {

	const [authors, setAuthors] = useState([])
	const [loading, setLoading] = useState(true);

	const fetchAuthors = async () => {
		setLoading(true)
		const res = await axios.get(BASE_URL + "checkout")
		if (res.status === 200) {
			const data = await res.data;
			setAuthors(data)
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchAuthors();
	}, [])


	return (
		<>
			<Head>
				<title>Formdata Authors</title>
			</Head>
			<AdminWrapper>
				<AdminChecker>
					{
						!loading && <>
							<div className="sidebar-page-container">
								<div className="auto-container">
									<div className="row clearfix">
										<div className="col-md-12">
											<div className="sec-title-two my-5 text-center">
												<div className="title color-three">Form Data Authors</div>
											</div>
										</div>
									</div>
									<div className="row clearfix">
										<div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
											<SubmissionSideBar title={"orders"} />
										</div>
										<div className="content-side col-lg-9 col-md-12 col-sm-12">
											<div className="blog-detail">
												<div className="inner-box">
													<table class="table">
														<thead>
															<tr>
																<th scope="col">#</th>
																<th scope="col">Full Name</th>
																<th scope="col">Email</th>
																<th scope="col">title</th>
																<th scope="col">address</th>
																<th scope="col">country</th>
																<th scope="col">state</th>
																<th scope="col">zip</th>
																<th scope="col">total</th>
															</tr>
														</thead>
														<tbody>
															{
																authors.map((e, i) => {
																	return <tr key={`coaching-row-${i}`}>
																		<th scope="row">{e.id}</th>
																		<td>{e.name + " " + e.surname}</td>
																		<td>{e.email}</td>
																		<td>{e.title}</td>
																		<td>{e.address}</td>
																		<td>{e.country}</td>
																		<td>
																			{e.state}
																		</td>
																		<td>
																			{e.zip}
																		</td>
																		<td>{e.price}</td>
																	</tr>

																})
															}
															<tr>

															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					}



				</AdminChecker>

			</AdminWrapper>



		</>
	);
}
