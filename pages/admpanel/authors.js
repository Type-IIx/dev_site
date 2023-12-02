import Head from "next/head";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import SubmissionSideBar from "../../components/AdminComps/SubmissionSideBar";
import axios from "axios";
import { BASE_URL } from "../../constants/apiInfo";
import { useEffect, useState } from "react";

export default function Formdataauthors() {

  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    setLoading(true)
    const res = await axios.get(BASE_URL + "submissions/authors/all")
    if (res.status === 200) {
      const data = await res.data;
      setAuthors(data)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAuthors();
  }, [])


  return (
    <>
      <Head>
        <title>Formdata Authors</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
          {
            !loading && <>
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
                      <div className="">
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
                              {
                                authors.map((e, i) => {
                                  return <tr key={`coaching-row-${i}`}>
                                    <th scope="row">{e.id}</th>
                                    <td>{e.fee_string}</td>
                                    <td>{e.email}</td>
                                    <td>{e.website}</td>
                                    <td>{e.authorships}</td>
                                    <td>{e.intent}</td>
                                    <td>
                                      {e.subject}
                                    </td>
                                    <td>
                                      {e.agreement}
                                    </td>
                                  </tr>

                                })
                              }
                              <tr>

                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }



        </AdminChecker>

      </AdminWrapper>



    </>
  );
}
