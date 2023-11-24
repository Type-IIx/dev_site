import Head from "next/head";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import SubmissionSideBar from "../../components/AdminComps/SubmissionSideBar";

export default function Formdatacoaching() {

  return (
    <>
      <Head>
        <title>Formdata Coaching</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
        <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-md-12">
              <div className="sec-title-two my-5 text-center">
                <div className="title color-three">Form Data Coaching</div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
              <SubmissionSideBar title={"coachings"} />
            </div>
            <div className="content-side col-lg-9 col-md-12 col-sm-12">
              <div className="blog-detail">
                <div className="inner-box">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Fee</th>
                        <th scope="col">Email</th>
                        <th scope="col">Duration</th>
                        <th scope="col">From Forum</th>
                        <th scope="col">Board Username</th>
                        <th scope="col">Referal Code</th>
                        <th scope="col">Clickwrap agreement & waiver</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>$250</td>
                        <td>Otto@email.com</td>
                        <td>3 months</td>
                        <td>T-Nation.com</td>
                        <td>@mdo</td>
                        <td>OTTOP098</td>
                        <td>
                          In publishing and graphic design, Lorem ipsum is a
                          placeholder text commonly used to demonstrate the
                          visual form of a document or a typeface without
                          relying on meaningful content. Lorem ipsum may be used
                          as a placeholder before final copy is available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        </AdminChecker>

      </AdminWrapper>

      
      
    </>
  );
}
