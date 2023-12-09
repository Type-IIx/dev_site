import Head from "next/head";
import Menu from "../../components/AdminComps/adminmenu";
import Footer from "../../components/AdminComps/adminfooter";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/apiHandler";
import { BASE_URL } from "../../constants/apiInfo";
import { toast } from "react-toastify";

export default function Settings() {
  const [socials, setSocials] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchURLs();
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