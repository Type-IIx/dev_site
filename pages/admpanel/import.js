import Head from "next/head";
import Menu from "./components/adminmenu";
import Footer from "./components/adminfooter";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";

export default function ImportBlog() {
  return (
    <>
      <Head>
        <title>Import Blog</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
          <section class="mentors-page-section">
            <div class="auto-container">
              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="sec-title-two my-5 text-center">
                    <div className="title color-three">Import Blog</div>
                  </div>
                </div>
              </div>
              <div class="row clearfix">
                <div class="mentor-block col-lg-4 col-md-6 col-sm-12 mx-auto">
                  <form>
                    <div className="form-group">
                      <label>Featured Image</label>
                      <input type="file" className="form-control" />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary float-right"
                    >
                      Import
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </AdminChecker>
      </AdminWrapper>
    </>
  );
}
