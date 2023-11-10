import Head from "next/head";
import Menu from "../../components/AdminComps/adminmenu";
import Footer from "../../components/AdminComps/adminfooter";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import axios from "axios";

export default function Addblog() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const test = async (e) => {
    e.preventDefault();
    const res = await axios.get("/api/bloghandler");
    console.log(res);
  };
  return (
    <>
      <Head>
        <title>Add New Blog</title>
      </Head>
      <AdminWrapper>
        <section className="price-page-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="col-md-12">
                <div className="sec-title-two my-5 text-center">
                  <div className="title color-three">Add new Blog</div>
                </div>
              </div>
            </div>
            <div className="row clearfix mb-3">
              <div className="col-md-12">
                <button onClick={test} className="btn btn-primary float-right">
                  Import Blog
                </button>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="form-group">
                  <Editor
                    apiKey="and0waidxlwtdyuu0jigei07tkx7coltmyqldar2ji3i9azr"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label>Featured Image</label>
                  <input type="file" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary float-right">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </AdminWrapper>
    </>
  );
}
