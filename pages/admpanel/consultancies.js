import Head from "next/head";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import SubmissionSideBar from "../../components/AdminComps/SubmissionSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/apiInfo";

export default function Formdataconsultancy() {

  const [consultancy, setConsultancy] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchConsultancies = async () => {
    setLoading(true)
    const res = await axios.get(BASE_URL + "submissions/consultancy/all")
    if (res.status === 200) {
      const data = await res.data;
      setConsultancy(data)
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchConsultancies();
  }, [])
  return (
    <>
      <Head>
        <title>Formdata Consultancy</title>
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
                        <div className="title color-three">Form Data Consultancy</div>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="sidebar-side col-lg-3 col-md-12 col-sm-12">
                      <SubmissionSideBar title={"consultancies"} />
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
                                <th scope="col">Duration</th>
                                <th scope="col">From Forum</th>
                                <th scope="col">Board Username</th>
                                <th scope="col">Referal Code</th>
                                {/* <th scope="col">Clickwrap agreement & waiver</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {
                                consultancy.map((e, i) => {
                                  return <tr key={`coaching-row-${i}`}>
                                    <th scope="row">{e.id}</th>
                                    <td>{e.fee_string}</td>
                                    <td>{e.email}</td>
                                    <td>{e.duration} months</td>
                                    <td>{e.forum}</td>
                                    <td>{e.username}</td>
                                    <td>{e.referal}</td>
                                    {/* <td>
                                      {e.agreement}
                                    </td> */}
                                  </tr>

                                })
                              }
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
