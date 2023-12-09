import Head from "next/head";
import Menu from "../../components/AdminComps/adminmenu";
import Footer from "../../components/AdminComps/adminfooter";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/apiHandler";
import { BASE_URL, path_ } from "../../constants/apiInfo";
import { toast } from "react-toastify";

export default function Settings() {
  const [socials, setSocials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forums, setForums] = useState([]);
	const [referrals,setReferrals] = useState([]);
	const [others, setOthers] = useState({
		call: "",
		coaching: "",
		authors: "",
		consultancy: ""
	});
	const forumRef = useRef();
	const referralRef = useRef();

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


	const fetchReferrals = async () => {
		const resp = await axiosInstance.get(BASE_URL + path_ + "referrals");
		if (resp.status === 200) {
			const result = await resp.data;
			setReferrals(result);
		}
	};

	const deleteReferrals = async (id) => {
		const resp = await axiosInstance.delete(BASE_URL + path_ + "referrals/" + id);
		if (resp.status === 200) {
			fetchData();
		}
	}

	const createReferrals = async (e) => {
		e.preventDefault();
		if (referralRef.current.value) {
			const resp = await axiosInstance.post(BASE_URL + path_ + "referrals", {
				code: referralRef.current.value
			})
			if (resp.status === 201) {
				toast.success("Created Referral code")
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
  const fetchURLs = async () => {
    setLoading(true);
    const resp = await axiosInstance.get(BASE_URL + "settings");
    if (resp.status === 200) {
      const result = await resp.data;
      let temp = {};
      for (const elem of result) {
        temp[elem.name] = elem;
      }
      console.log(temp);
      setSocials(temp);
    }
    setLoading(false);
  };

	const fetchData = async () => {
		setLoading(true);
		await fetchForums();
		await fetchReferrals();
		await fetchOthers();
    await fetchURLs();
		setLoading(false);

	}

	useEffect(() => {
		fetchData();
	}, []);

  


  const updateURL = async (name) => {
    const url = BASE_URL + `settings/edit/${name}`;
    const body = {
      url: document.getElementById(name).value,
    };
    const resp = await axiosInstance.post(url, body);
    if (resp.status === 200) {
      toast.success("updated");
      await fetchURLs();
    } else {
      toast.error("failed");
    }
  };


  const updatePassword = async () => {
    const email = document.getElementById("newemail").value;
    const passval = document.getElementById("newpass").value;
    const body = {
      email,
      password : passval
    }

    const r = await axiosInstance.post(BASE_URL + "update",body)
    if (r.status === 200){
      toast.success("updated account details")
    }else{
      toast.error("Failed")
    }

  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
        {socials !== null && !loading && (
          <>
            <section class="mentors-page-section">
              <div class="auto-container">

                <div class="row clearfix">
                  <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                    <div class="inner-box">
                      <div class="lower-content">
                        <div className="sec-title-two">
                          <div className="title color-three">Telegram</div>
                        </div>

                        <div className="form-group">
                          <label>URL</label>
                          <div class="input-group">
                            <input
                              id="telegram"
                              type="text"
                              defaultValue={
                                socials.telegram ? socials.telegram.url : ""
                              }
                              className="form-control"
                            />
                            <button
                              class="btn btn-outline-secondary"
                              onClick={() => updateURL("telegram")}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                    <div class="inner-box">
                      <div class="lower-content">
                        <div className="sec-title-two">
                          <div className="title color-three">Matrix</div>
                        </div>
                        <div className="form-group">
                          <label>URL</label>
                          <div class="input-group">
                            <input
                              id="matrix"
                              type="text"
                              defaultValue={
                                socials.matrix ? socials.matrix.url : ""
                              }
                              className="form-control"
                            />
                            <button
                              class="btn btn-outline-secondary"
                              onClick={() => updateURL("matrix")}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                    <div class="inner-box">
                      <div class="lower-content">
                        <div className="sec-title-two">
                          <div className="title color-three">XMPP</div>
                        </div>
                        <div className="form-group">
                          <label>URL</label>
                          <div class="input-group">
                            <input
                              id="xmpp"
                              type="text"
                              defaultValue={
                                socials.xmpp ? socials.xmpp.url : ""
                              }
                              className="form-control"
                            />
                            <button
                              class="btn btn-outline-secondary"
                              onClick={() => updateURL("xmpp")}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                    <div class="inner-box">
                      <div class="lower-content">
                        <div className="sec-title-two">
                          <div className="title color-three">New Password</div>
                        </div>
                        <div className="form-group">
                          <label>New Email</label>
                          <div class="input-group">
                            <input
                              id="newemail"
                              type="email"
                              
                              className="form-control"
                            />
                            
                          </div>
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <div class="input-group">
                            <input
                              id="newpass"
                              type="password"
                              
                              className="form-control"
                            />
                            <button
                              class="btn btn-outline-secondary"
                              onClick={updatePassword}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

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
											<h6>Add Referral Code</h6>
											<div className="form-group">
												<div class="input-group">
													<input type="text" className="form-control"
														ref={referralRef}
													/>
													<div class="input-group-append">
														<button type="submit" className="btn btn-primary"
															onClick={createReferrals}
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
														<th scope="col">Referral Code</th>
														<th scope="col"></th>
													</tr>
												</thead>
												<tbody>
													{referrals.map((e, i) => {
														return <tr>
															<th scope="row">{i + 1}</th>
															<td>{e.code}</td>
															<td>
																<a className="btn btn-sm btn-danger text-white"
																	onClick={() => {
																		deleteReferrals(e.id)
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
        )}
        </AdminChecker>
        
      </AdminWrapper>
    </>
  );
}





{/* <div class="row clearfix">
              <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <img
                      class="transition-500ms"
                      src="/img/logo.png"
                      alt="Logo"
                    />
                  </div>
                  <div class="lower-content">
                    <div className="sec-title-two">
                      <div className="title color-three">Logo</div>
                    </div>
                    <h5>Upload (Size: 160x80)</h5>
                    <form action="#">
                      <div className="form-group">
                        <div class="input-group">
                          <input type="file" className="form-control" />
                          <button class="btn btn-outline-secondary">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <img
                      class="transition-500ms"
                      src="/img/logo.png"
                      alt="Logo"
                    />
                  </div>
                  <div class="lower-content">
                    <div className="sec-title-two">
                      <div className="title color-three">Logo Small</div>
                    </div>
                    <h5>Upload (Size: 160x66)</h5>
                    <form action="#">
                      <div className="form-group">
                        <div class="input-group">
                          <input type="file" className="form-control" />
                          <button class="btn btn-outline-secondary">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="image">
                    <img
                      class="transition-500ms"
                      src="/images/favicon.png"
                      alt="Favicon"
                    />
                  </div>
                  <div class="lower-content">
                    <div className="sec-title-two">
                      <div className="title color-three">Favicon</div>
                    </div>
                    <h5>Upload</h5>
                    <form action="#">
                      <div className="form-group">
                        <div class="input-group">
                          <input type="file" className="form-control" />
                          <button class="btn btn-outline-secondary">
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div> */}