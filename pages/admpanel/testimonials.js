import Head from "next/head";
import Link from "next/link";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/apiInfo";
import axios from "axios";
import { axiosInstance } from "../../utils/apiHandler"
import { toast } from "react-toastify";
import { useRouter } from "next/router";


export default function TestimonialList() {
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchTestimonials = async () => {
		setLoading(true);
		const url = BASE_URL + "testimonials/all";
		const res = await axios.get(url);
		if (res.status === 200) {
			const data = await res.data;
			setTestimonials(data);
		}
		setLoading(false);
	};

	useEffect(() => {

		fetchTestimonials();
	}, []);


	const deleteTestimonial = async (id) => {
		const url = BASE_URL + `testimonials/delete/${id}`
		const res = await axiosInstance.delete(url);
		if (res.status === 200) {
			toast.success("Deleted testimonials")
			fetchTestimonials();
		} else {
			toast.error("Failed Deleting testimonial")
		}
	}

	return (
		<>
			<Head>
				<title>Testimonials</title>
			</Head>
			<AdminWrapper>
				<AdminChecker>

					{
						!loading && <>

							<section className="price-page-section">
								<div className="auto-container">
									<div className="row clearfix my-3">
										<div class="col-md-6">
											<div className="sec-title-two">
												<div className="title color-three">Testimonials</div>
											</div>
										</div>
										<div class="col-md-6">
											<div className="float-right">
												<Link className="theme-btn btn-style-two" href="/admpanel/addtestimonial">
													<span className="txt">Add New Testimonial</span>
												</Link>
											</div>
										</div>

										<table className="table">
											<tbody>
												{
													testimonials.map((e, i) => {
														return <tr key={`admin-testimonial-${i}`}>
															<th scope="row">1</th>
															<td>
																<h4>{e.name}</h4>
																<Link href={`/admpanel/edittestimonial/${e.id}`} className="btn btn-sm btn-dark text-white m-2">Edit</Link>
																<a onClick={() => { deleteTestimonial(e.id) }} className="btn btn-sm btn-danger text-white">Delete</a>
															</td>
														</tr>
													})
												}


											</tbody>
										</table>
									</div>
								</div>
							</section>


						</>

					}

				</AdminChecker>
			</AdminWrapper>


		</>
	);
}
