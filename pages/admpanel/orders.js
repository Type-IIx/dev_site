import Head from "next/head";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import SubmissionSideBar from "../../components/AdminComps/SubmissionSideBar";
import axios from "axios";
import { BASE_URL } from "../../constants/apiInfo";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/helpers";

export default function Formdataorders() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAuthors = async () => {
    setLoading(true);
    const res = await axios.get(BASE_URL + "checkout");
    if (res.status === 200) {
      const data = await res.data;
      setAuthors(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      <Head>
        <title>Formdata Authors</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
          {!loading && (
            <>
              <div className="sidebar-page-container">
                <div className="auto-container">
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <div className="sec-title-two my-5 text-center">
                        <div className="title color-three">Orders</div>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="content-side col-lg-12 col-md-12 col-sm-12">
                      <div className="inner-box">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">Order ID</th>
                              <th scope="col">Book Name</th>
                              <th scope="col">Book Type</th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Address</th>
                              <th scope="col">Country</th>
                              <th scope="col">State</th>
                              <th scope="col">Zip</th>
                              <th scope="col">Price</th>
                              <th scope="col">VAT</th>
                              <th scope="col">Total</th>
                              <th scope="col">date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {authors.map((e, i) => {
                              return (
                                <tr key={`coaching-row-${i}`}>
                                  <th scope="row">{e.id}</th>

                                  <td>{e.title}</td>
                                  <td>{e.copy}</td>
                                  <td>{e.name + " " + e.surname}</td>
                                  <td>{e.email}</td>
                                  <td>{e.address}</td>
                                  <td>{e.country}</td>
                                  <td>{e.state}</td>
                                  <td>{e.zip}</td>
                                  <td>{e.price}</td>
                                  <td>{e.vat}</td>
                                  <td>{e.total}</td>
                                  <td>{formatDate(e.created)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </AdminChecker>
      </AdminWrapper>
    </>
  );
}
