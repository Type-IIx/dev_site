import Head from "next/head";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import AdminWrapper from "../../../components/AdminComps/AdminWrapper";
import axios from "axios";
import { BASE_URL } from "../../../constants/apiInfo";
import { axiosInstance } from "../../../utils/apiHandler";
import AdminChecker from "../../../components/AdminComps/AdminChecker";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

export default function EditBlog() {
  const editorRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const [articleId, setArticleId] = useState(-1);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchArticle = async () => {
    setLoading(true);
    if (articleId !== -1) {
      console.log(`Fetching Article ${articleId}`);
      const url = BASE_URL + `blog/${articleId}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        const data = await res.data;
        setArticle(data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      setArticleId(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  const uploadHandler = async (body, image) => {
    let form_data = new FormData();
    if (image) {
      form_data.append("image", image, image.name);
    }
    const keys = Object.keys(body);
    for (let key of keys) {
      form_data.append(key, body[key]);
    }
    const url = BASE_URL + "blog/edit/" + articleId;
    const res = await axiosInstance.post(url, form_data);
    if (res.status === 200) {
      toast.success("Updated");
      await fetchArticle();
      router.push("/admpanel/bloglist")
    } else {
      toast.error("Failed");
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
          {!loading && article && (
            <>
              <section className="price-page-section">
                <div className="auto-container">
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <div className="sec-title-two my-5 text-center">
                        <div className="title color-three">Edit Blog</div>
                      </div>
                    </div>
                  </div>
                  <div className="row clearfix mb-3">
                    <div className="col-md-12">
                      <Link href="/admpanel/addblog">
                        <button className="btn btn-primary float-right">
                          Add New Blog
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
                          defaultValue={article.title}
                          className="form-control"
                          placeholder="Title"
                        />
                      </div>
                      <div className="form-group">
                        <Editor
                          apiKey="and0waidxlwtdyuu0jigei07tkx7coltmyqldar2ji3i9azr"
                          initialValue={article.content}
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
                        Edit
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            </>
          )}
        </AdminChecker>
      </AdminWrapper>
    </>
  );
}
