import Head from "next/head";
import Menu from "../../components/AdminComps/adminmenu";
import Footer from "../../components/AdminComps/adminfooter";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/apiHandler";
import { BASE_URL, path_ } from "../../constants/apiInfo";
import { toast } from "react-toastify";

export default function Others() {
	const [forums, setForums] = useState([]);
	const [others, setOthers] = useState({
		call: "",
		coaching: "",
		authors: "",
		consultancy: ""
	});
	const [loading, setLoading] = useState(true);
	const forumRef = useRef();

	const fetchForums = async () => {
		const resp = await axiosInstance.get(BASE_URL + path_ + "forum");
		if (resp.status === 200) {
			const result = await resp.data;
			setForums(result);
		}
	};

	const deleteForum = async (id) => {
		const resp = await axiosInstance.delete(BASE_URL + path_ + "forum/" + id);
		if (resp.status === 200) {
			fetchData();
		}
	}

	const createForum = async (e) => {
		e.preventDefault();
		if (forumRef.current.value) {
			const resp = await axiosInstance.post(BASE_URL + path_ + "forum", {
				name: forumRef.current.value
			})
			if (resp.status === 201) {
				toast.success("Created Forum")
				fetchData();
			}
		}

	}

	const handleOtherChange = (e) => {
		let temp = { ...others }
		temp[e.target.name] = e.target.value;
		setOthers(temp);
	}

	const fetchOthers = async () => {
		const resp = await axiosInstance.get(BASE_URL + path_ + "other");

		if (resp.status === 200) {
			const result = await resp.data;
			setOthers(result);
		}
	}

	const updateOthers = async (e) => {
		e.preventDefault();
		console.log(others)
		const resp = await axiosInstance.post(BASE_URL + path_ + "other", others)
		if (resp.status === 200) {
			toast.success("Updated")
			fetchOthers();
		}

	}

	const fetchData = async () => {
		setLoading(true);
		await fetchForums();
		await fetchOthers();
		setLoading(false);

	}

	useEffect(() => {
		fetchData();
	}, []);



	return (
		<>
			<Head>
				<title>Others</title>
			</Head>
			<AdminWrapper>
				{
					!loading && <>
						<section class="mentors-page-section">
							<div class="auto-container">
								<div className="row clearfix">
									<div className="col-md-12">
										<div className="sec-title-two my-5 text-center">
											<div className="title color-three">Other Settings</div>
										</div>
									</div>
								</div>
								<div class="row clearfix">
									<div class="mentor-block col-lg-8 col-md-8 col-sm-12">
										<form>
											<h6>Add Forum</h6>
											<div className="form-group">
												<div class="input-group">
													<input type="text" className="form-control"
														ref={forumRef}
													/>
													<div class="input-group-append">
														<button type="submit" className="btn btn-primary"
															onClick={createForum}
														>
															Submit
														</button>
													</div>
												</div>
											</div>
										</form>
										<div class="table-responsive">
											<table class="table table-bordered">
												<thead>
													<tr>
														<th scope="col">#</th>
														<th scope="col">Forum Name</th>
														<th scope="col"></th>
													</tr>
												</thead>
												<tbody>
													{forums.map((e, i) => {
														return <tr>
															<th scope="row">{i + 1}</th>
															<td>{e.name}</td>
															<td>
																<a className="btn btn-sm btn-danger text-white"
																	onClick={() => {
																		deleteForum(e.id)
																	}}
																>
																	Delete
																</a>
															</td>
														</tr>
													})}


												</tbody>
											</table>
										</div>
									</div>
									<div class="mentor-block col-lg-4 col-md-4 col-sm-12">
										<form>
											<h6>Call for free consultation</h6>
											<div className="form-group">
												<div class="input-group">
													{/* <div class="input-group-prepend">
														<select className="form-control">
															<option>+1</option>
														</select>
													</div> */}
													<input
														type="text"
														className="form-control"
														name="call"
														value={others.call}
														onChange={handleOtherChange}
														placeholder="+11234567890"
													/>
													<div class="input-group-append">
														<button type="submit" className="btn btn-primary"
															onClick={updateOthers}
														>
															Save
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
									<div class="mentor-block col-lg-6 col-md-6 col-sm-12">
										<form>
											<h6>Clickwrap agreements & waivers (Coaching)</h6>
											<div className="form-group">
												<textarea
													className="form-control"
													cols="8"
													rows="8"
													name="coaching"
													value={others.coaching}
													onChange={handleOtherChange}
												></textarea>
												<button
													type="submit"
													className="btn btn-primary float-right mt-3"
													onClick={updateOthers}

												>
													Submit
												</button>
											</div>
										</form>
									</div>
									<div class="mentor-block col-lg-6 col-md-6 col-sm-12">
										<form>
											<h6>Clickwrap agreements & waivers (Consultancy)</h6>
											<div className="form-group">
												<textarea
													className="form-control"
													cols="8"
													rows="8"
													name="consultancy"
													value={others.consultancy}
													onChange={handleOtherChange}
												></textarea>
												<button
													type="submit"
													className="btn btn-primary float-right mt-3"
													onClick={updateOthers}

												>
													Submit
												</button>
											</div>
										</form>
									</div>
									<div class="mentor-block col-lg-6 col-md-6 col-sm-12">
										<form>
											<h6>Clickwrap agreements & waivers (Authors)</h6>
											<div className="form-group">
												<textarea
													className="form-control"
													cols="8"
													rows="8"
													name="authors"
													value={others.authors}
													onChange={handleOtherChange}
												></textarea>
												<button
													type="submit"
													className="btn btn-primary float-right mt-3"
													onClick={updateOthers}

												>
													Submit
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</section>
					</>
				}

			</AdminWrapper>
		</>
	);
}





