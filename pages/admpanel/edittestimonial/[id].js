import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRef } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AdminWrapper from "../../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../../components/AdminComps/AdminChecker";
import { BASE_URL } from "../../../constants/apiInfo";
import { axiosInstance } from "../../../utils/apiHandler";
import axios from "axios";


function AddTestimonial() {
	const [testimonial, setTestimonial] = useState({
		name: "",
		rating: 0,
		content: ""
	})
	const [loading, setLoading] = useState(true);
	const [testimonialId, setTestimonialId] = useState(-1);

	const router = useRouter();


	const fetchTestimonial = async () => {
		setLoading(true);
		if (testimonialId !== -1) {
			const url = BASE_URL + `testimonials/${testimonialId}`;
			const res = await axios.get(url);
			if (res.status === 200) {
				const data = await res.data;
				setTestimonial(data);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		if (router.isReady) {
			setTestimonialId(router.query.id);
		}
	}, [router.isReady]);

	useEffect(() => {
		fetchTestimonial();
	}, [testimonialId]);


	const handleChange = (e) => {
		let temp = { ...testimonial }
		temp[e.target.name] = e.target.value
		setTestimonial(temp);
	}







	const submitData = async (e) => {
		e.preventDefault();
		try {
			const rt = Number(testimonial.rating);
			let body = { ...testimonial }
			body.rating = rt > 0 ? (rt < 5 ? rt : 5) : 0
			const resp = await axiosInstance.post(BASE_URL + `testimonials/edit/${testimonialId}`, body)
			if (resp.status === 200) {
				toast.success("Updated Testimonial")
				router.push("/admpanel/testimonials")
			}


		} catch {

		}


	};

	return (
		<>
			<Head>
				<title>Edit Testimonial</title>
			</Head>
			<AdminWrapper>
				<AdminChecker>
					{
						!loading && testimonialId != -1 && <>
							<section className="price-page-section">
								<div className="auto-container">
									<div className="row clearfix">
										<div className="col-md-12">
											<div className="sec-title-two my-5 text-center">
												<div className="title color-three">Edit Testimonial</div>
											</div>
										</div>
									</div>

									<div className="contact-form">
										<form>
											<div className="form-group">
												<input
													name="name"
													value={testimonial.name}
													onChange={handleChange}
													type="text"
													className="form-control"
													placeholder="Name"
												/>
											</div>

											<div className="form-group">
												<input
													name="rating"
													value={testimonial.rating}
													onChange={handleChange}
													type="number"
													className="form-control"
													placeholder="Rating (0 - 5)"
												/>
											</div>

											<div className="form-group">
												<textarea
													name="content"
													value={testimonial.content}
													onChange={handleChange}

												></textarea>
											</div>


											<button
												onClick={submitData}
												className="btn btn-primary float-right"
											>
												Submit
											</button>
										</form>
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

export default AddTestimonial;