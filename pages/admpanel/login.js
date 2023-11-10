import Head from "next/head";
import Footer from "../../components/AdminComps/adminfooter";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import AdminChecker from "../../components/AdminComps/AdminChecker";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if (email && password) {
      const body = {
        email,
        password,
        redirect: false,
      };
      const res = await signIn("credentials", body);
      if (res.ok) {
        toast.success("Success");
      } else {
        toast.error("failed");
      }
    } else {
      toast.error("Submit a valid email and password");
    }
  };

  return (
    <>
      <Head>
        <title>Admin | Login</title>
      </Head>

      <AdminChecker isLogin={true}>
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
                    <form>
                      <div className="row clearfix">
                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <span className="icon flaticon-envelope"></span>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-Mail Address"
                            required
                          />
                        </div>

                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <span className="icon flaticon-padlock"></span>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                          />
                        </div>

                        <div className="form-group col-lg-12 col-md-12 col-sm-12">
                          <button
                            className="theme-btn btn-style-two"
                            name="submit-form"
                            onClick={handleSubmit}
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
      </AdminChecker>

      <Footer />
    </>
  );
}
