import Head from "next/head";
import React from "react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { useRef } from "react";
import { BASE_URL } from "../../constants/apiInfo";
import { axiosInstance } from "../../utils/apiHandler";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/router";


function Addbook() {
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const bookRef = useRef(null);
  const editorRef = useRef(null);
  const router = useRouter();


  const handleImport = async () => {
    let form_data = new FormData();
    const file =
      bookRef.current.files.length > 0 ? bookRef.current.files[0] : null;
    if (file) {
      form_data.append("book", file, file.name);
      form_data.append("title", titleRef.current.value);
      form_data.append("price", priceRef.current.value);
      form_data.append("description", editorRef.current.getContent())
      const url = BASE_URL + "book/create";
      const res = await axiosInstance.post(url, form_data);
      if (res.status === 201) {
        const resp_json = await res.data;
        console.log(`Received data ${resp_json}`);
        return resp_json;
      } else {
        return false;
      }
    } else {
      toast.warning("Please select a file");
    }
  };

  const handleEdit = async (id_) => {
    let form_data = new FormData();
    const image =
      imageRef.current.files.length > 0 ? imageRef.current.files[0] : null;
    if (image) {
      form_data.append("image", image, image.name);

      const url = BASE_URL + `book/edit/${id_}`;
      const res = await axiosInstance.post(url, form_data);
      if (res.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      toast.warning("Please select an image");
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    const file =
      bookRef.current.files.length > 0 ? bookRef.current.files[0] : null;
    const image =
      imageRef.current.files.length > 0 ? imageRef.current.files[0] : null;
    if (!file) {
      toast.warning("Please select a file");
    } else if (!image) {
      toast.warning("Please select an image");
    } else {
      const res = await handleImport();
      if (res) {
        const res2 = await handleEdit(res.id);
        if (res2) {
          toast.success("Success");
          router.push("/admpanel/booklist")
        } else {
          toast.error("Failed Import");
        }
      } else {
        toast.error("Failed Import");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add New Book</title>
      </Head>
      <AdminWrapper>
        <AdminChecker>
          <section className="price-page-section">
            <div className="auto-container">
              <div className="row clearfix">
                <div className="col-md-12">
                  <div className="sec-title-two my-5 text-center">
                    <div className="title color-three">Add new Book</div>
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
                      placeholder="Title"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      ref={priceRef}
                      type="text"
                      className="form-control"
                      placeholder="Price"
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

                  <div className="form-group">
                    <label>Book (PDF)</label>
                    <input ref={bookRef} type="file" className="form-control" />
                  </div>
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
        </AdminChecker>
      </AdminWrapper>
    </>
  );
}

export default Addbook;