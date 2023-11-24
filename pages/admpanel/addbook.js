import Head from "next/head";
import React from "react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useRef } from "react";
import { BASE_URL } from "../../constants/apiInfo";
import { axiosInstance } from "../../utils/apiHandler";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";

function BookList() {




  return (
    <>
      <Head>
        <title>Book Lists</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
          <section className="price-page-section">
            <div className="auto-container">
              <div className="row clearfix my-3">
                <div class="col-md-6">
                  <div className="sec-title-two">
                    <div className="title color-three">List of Books</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div className="float-right">
                    <Link className="theme-btn btn-style-two" href="/admpanel/addbook">
                      <span className="txt">Add New Book</span>
                    </Link>
                  </div>
                </div>

                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        <h4>How to success through market segmentation</h4>
                        <a className="btn btn-sm btn-dark text-white m-2">Edit</a>
                        <a className="btn btn-sm btn-danger text-white">Delete</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        <h4>How to success through market segmentation</h4>
                        <a className="btn btn-sm btn-dark text-white m-2">Edit</a>
                        <a className="btn btn-sm btn-danger text-white">Delete</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        <h4>How to success through market segmentation</h4>
                        <a className="btn btn-sm btn-dark text-white m-2">Edit</a>
                        <a className="btn btn-sm btn-danger text-white">Delete</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>
                        <h4>How to success through market segmentation</h4>
                        <a className="btn btn-sm btn-dark text-white m-2">Edit</a>
                        <a className="btn btn-sm btn-danger text-white">Delete</a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>
                        <h4>How to success through market segmentation</h4>
                        <a className="btn btn-sm btn-dark text-white m-2">Edit</a>
                        <a className="btn btn-sm btn-danger text-white">Delete</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </AdminChecker>
      </AdminWrapper>
    </>
  );
}

export default BookList;
