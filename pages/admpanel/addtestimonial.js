import Head from "next/head";
import React from "react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useRef } from "react";
import { BASE_URL } from "../../constants/apiInfo";
import { axiosInstance } from "../../utils/apiHandler";
import { toast } from "react-toastify";
import { useRouter } from "next/router";


function AddTestimonial() {
	const nameRef = useRef(null);
	const ratingRef = useRef(null);
	const contentRef = useRef(null);
	const imageRef = useRef(null);

	const router = useRouter();







	const submitData = async (e) => {
		e.preventDefault();
		try {
			const rt = Number(ratingRef.current.value);
			const body = {
				name: nameRef.current.value,
				rating: rt > 0 ? (rt < 5 ? rt : 5) : 0,
				content: contentRef.current.value
			}
			let form_data = new FormData();
			const file = imageRef.current.files.length > 0 ? imageRef.current.files[0] : null
			if (file){
				form_data.append("image",file,file.name)
				for (const f of Object.keys(body)){
					form_data.append(f,body[f]);
				}
				const resp = await axiosInstance.post(BASE_URL + "testimonials/create", form_data)
				if (resp.status === 201) {
					toast.success("Created Testimonial")
					router.push("/admpanel/testimonials")
				}
			}
			


		} catch {

		}


	};

	return (
		<>
			<Head>
				<title>Add New Testimonial</title>
			</Head>
			<AdminWrapper>
				<AdminChecker>
					<section className="price-page-section">
						<div className="auto-container">
							<div className="row clearfix">
								<div className="col-md-12">
									<div className="sec-title-two my-5 text-center">
										<div className="title color-three">Add new Testimonial</div>
									</div>
								</div>
							</div>

							<div className="contact-form">
								<form>
									<div className="form-group">
										<input
											ref={nameRef}
											type="text"
											className="form-control"
											placeholder="Name"
										/>
									</div>

									<div className="form-group">
										<input
											ref={ratingRef}
											type="number"
											className="form-control"
											placeholder="Rating (0 - 5)"
										/>
									</div>

									<div className="form-group">
										<textarea
											ref={contentRef}

										></textarea>
									</div>
									<div className="form-group">
										<label>Flag Image</label>
										<input
										ref={imageRef}
										type="file"
										className="form-control"
										/>
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
				</AdminChecker>
			</AdminWrapper>
		</>
	);
}

export default AddTestimonial;