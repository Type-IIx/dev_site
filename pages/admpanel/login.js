import Head from "next/head";
import Footer from "../../components/AdminComps/adminfooter";

export default function Login() {
  return (
    <>
      <Head>
        <title>Admin | Login</title>
      </Head>

      <section className="page-title login-banner-section">
        <div className="auto-container">
          <div className="content">
            <div className="text">Welcome Admin</div>
            <h1>Login</h1>
          </div>
        </div>
      </section>

      <section className="login-form-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="form-column col-lg-6 col-md-12 col-sm-12 mx-auto">
              <div className="inner-column">
                <div className="sec-title-two">
                  <div className="title color-three">Login</div>
                </div>

                <div className="contact-form">
                  <form method="post" action="/dashboard">
                    <div className="row clearfix">
                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <span className="icon flaticon-envelope"></span>
                        <input
                          type="email"
                          name="email"
                          placeholder="E-Mail Address"
                          required
                        />
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <span className="icon flaticon-padlock"></span>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          required
                        />
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <button
                          className="theme-btn btn-style-two"
                          type="submit"
                          name="submit-form"
                        >
                          <span className="txt">Login</span>
                        </button>
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
