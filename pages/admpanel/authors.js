import Head from "next/head";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import SubmissionSideBar from "../../components/AdminComps/SubmissionSideBar";

export default function Formdataauthors() {
  return (
    <>
      <Head>
        <title>Formdata Authors</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
        <div className="sidebar-page-container">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-md-12">
              <div className="sec-title-two my-5 text-center">
                <div className="title color-three">Form Data Authors</div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
              <SubmissionSideBar title={"authors"} />
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
                        <th scope="col">Website or Business name</th>
                        <th scope="col">Work of Authorship</th>
                        <th scope="col">Intent of the writing(s)</th>
                        <th scope="col">Subject matter & scope</th>
                        <th scope="col">Clickwrap agreement & waiver</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>$300</td>
                        <td>Otto@email.com</td>
                        <td>Loreipsum</td>
                        <td>2</td>
                        <td>Education, Research, Marketing</td>
                        <td>
                          In publishing and graphic design, Lorem ipsum is a
                          placeholder text commonly used to demonstrate the
                          visual form of a document or a typeface without
                          relying on meaningful content. Lorem ipsum may be used
                          as a placeholder before final copy is available
                        </td>
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
