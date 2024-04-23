import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

import { toast } from "react-toastify";
/* import { Editor } from "@tinymce/tinymce-react"; */
import { useRouter } from "next/router";
import AdminWrapper from "../../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../../components/AdminComps/AdminChecker";
import { axiosInstance } from "../../../utils/apiHandler";
import { BASE_URL } from "../../../constants/apiInfo";
import axios from "axios";
import { convertEditorToHtml, convertHtmlToEdit } from "../../../utils/helpers";
import dynamic from "next/dynamic";

const EditorComp = dynamic(
  () => {
    return import("../../../components/AdminComps/EditorComp");
  },
  { ssr: false }
);

function Addbook() {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const vatRef = useRef(null);
  const bookRef = useRef(null);
  const editorRef = useRef(null);
  const [bookId, setBookId] = useState(-1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [content, setContent] = useState();

  const fethBook = async () => {
    setLoading(true);
    if (bookId !== -1) {
      console.log(`Fetching Article ${bookId}`);
      const url = BASE_URL + `book/${bookId}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        const data = await res.data;
        setBook(data);
        setContent(convertHtmlToEdit(data.description));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      setBookId(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    fethBook();
  }, [bookId]);

  const handleEdit = async (id_) => {
    let form_data = new FormData();
    const image =
      imageRef.current.files.length > 0 ? imageRef.current.files[0] : null;

    form_data.append("title", titleRef.current.value);
    form_data.append("price", priceRef.current.value);
    form_data.append("Vat", vatRef.current.value);
    form_data.append("description", convertEditorToHtml(content));
    if (image) {
      form_data.append("image", image, image.name);
    }
    const url = BASE_URL + `book/edit/${id_}`;
    const res = await axiosInstance.post(url, form_data);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  };

  const submitData = async (e) => {
    e.preventDefault();

    const res2 = await handleEdit(bookId);
    if (res2) {
      toast.success("Success");
      router.push("/admpanel/booklist");
    } else {
      toast.error("Failed Edit");
    }
  };

  return (
    <>
      <Head>
        <title>Edit book</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
          {!loading && book && (
            <>
              <section className="price-page-section">
                <div className="auto-container">
                  <div className="row clearfix">
                    <div className="col-md-12">
                      <div className="sec-title-two my-5 text-center">
                        <div className="title color-three">Edit Book</div>
                      </div>
                    </div>
                  </div>

                  <div className="contact-form">
                    <form>
                      <div className="form-group">
                        <input
                          ref={titleRef}
                          type="text"
                          className="form-control"
                          defaultValue={book.title}
                          placeholder="Title"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          ref={priceRef}
                          type="text"
                          className="form-control"
                          defaultValue={book.price}
                          placeholder="Price"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          ref={vatRef}
                          type="text"
                          className="form-control"
                          defaultValue={book.Vat}
                          placeholder="Vat"
                        />
                      </div>

                      <div className="form-group">
                        <EditorComp
                          content={content}
                          setContent={setContent}
                          defaultContent={book.description}
                        />
                        {/* <Editor
                          apiKey="and0waidxlwtdyuu0jigei07tkx7coltmyqldar2ji3i9azr"
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue={book.description}
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
                        /> */}
                      </div>

                      <div className="form-group">
                        <label>Book Image</label>
                        <input
                          ref={imageRef}
                          type="file"
                          className="form-control"
                        />
                      </div>

                      {/* <div className="form-group">
                    <label>Book (PDF)</label>
                    <input ref={bookRef} type="file" className="form-control" />
                  </div> */}
                      <button
                        onClick={submitData}
                        className="btn btn-primary float-right"
                      >
                        Submit
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

export default Addbook;
