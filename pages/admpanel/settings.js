import Head from "next/head";
import Menu from "../../components/AdminComps/adminmenu";
import Footer from "../../components/AdminComps/adminfooter";

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Menu />

      <section class="mentors-page-section">
        <div class="auto-container">
          <div class="row clearfix">
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
                        <button class="btn btn-outline-secondary">Save</button>
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
                        <button class="btn btn-outline-secondary">Save</button>
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
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row clearfix">
            <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
              <div class="inner-box">
                <div class="lower-content">
                  <div className="sec-title-two">
                    <div className="title color-three">Telegram</div>
                  </div>
                  <form action="#">
                    <div className="form-group">
                      <label>Upload</label>
                      <div class="input-group">
                        <input type="file" className="form-control" />
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Hide/Show Social Icon</label>
                      <div class="input-group">
                        <select className="form-control">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
              <div class="inner-box">
                <div class="lower-content">
                  <div className="sec-title-two">
                    <div className="title color-three">Matrix</div>
                  </div>
                  <form action="#">
                    <div className="form-group">
                      <label>Upload</label>
                      <div class="input-group">
                        <input type="file" className="form-control" />
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Hide/Show Social Icon</label>
                      <div class="input-group">
                        <select className="form-control">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mentor-block col-lg-4 col-md-6 col-sm-12">
              <div class="inner-box">
                <div class="lower-content">
                  <div className="sec-title-two">
                    <div className="title color-three">XMPP</div>
                  </div>
                  <form action="#">
                    <div className="form-group">
                      <label>Upload</label>
                      <div class="input-group">
                        <input type="file" className="form-control" />
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                    <div class="form-group">
                      <label>Hide/Show Social Icon</label>
                      <div class="input-group">
                        <select className="form-control">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                        <button class="btn btn-outline-secondary">Save</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
