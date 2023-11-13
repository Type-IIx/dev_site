import Head from "next/head";
import Menu from "../../components/AdminComps/adminmenu";
import Footer from "../../components/AdminComps/adminfooter";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import axios from "axios";
import { BASE_URL } from "../../constants/apiInfo";
import { axiosInstance } from "../../utils/apiHandler";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { toast } from "react-toastify";
import Link from "next/link";

export default function Addblog() {
  const editorRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  const uploadHandler = async (body, image) => {
    let form_data = new FormData();
    if (image) {
      form_data.append("image", image, image.name);
      const keys = Object.keys(body);
      for (let key of keys) {
        form_data.append(key, body[key]);
      }
      const url = BASE_URL + "blog/create";
      const res = await axiosInstance.post(url, form_data);
      if (res.status === 201) {
        toast.success("Created");
      } else {
        toast.error("Failed");
      }
    } else {
      toast.warning("Please upload image");
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    const body = {
      title: titleRef.current.value,
      content: editorRef.current.getContent(),
    };
    const image =
      imageRef.current.files.length > 0 ? imageRef.current.files[0] : null;
    uploadHandler(body, image);
  };

  return (
    <>
      <Head>
        <title>Add New Blog</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
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
                  <Link href="/admpanel/import">
                    <button className="btn btn-primary float-right">
                      Import Blog
                    </button>
                  </Link>
                </div>
              </div>
              <div className="contact-form">
                <form>
                  <div className="form-group">
                    <input
                      ref={titleRef}
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
                    <input
                      ref={imageRef}
                      type="file"
                      className="form-control"
                    />
                  </div>
                  <button
                    onClick={submitBlog}
                    className="btn btn-primary float-right"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </section>
        </AdminChecker>
      </AdminWrapper>
    </>
  );
}
