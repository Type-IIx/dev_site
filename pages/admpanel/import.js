import Head from "next/head";
import React, { useRef } from "react";
import AdminWrapper from "../../components/AdminComps/AdminWrapper";
import AdminChecker from "../../components/AdminComps/AdminChecker";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/apiInfo";
import { axiosInstance } from "../../utils/apiHandler";

export default function ImportBlog() {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const fileRef = useRef(null);

  const handleImport = async () => {
    let form_data = new FormData();
    const file =
      fileRef.current.files.length > 0 ? fileRef.current.files[0] : null;
    if (file) {
      form_data.append("file", file, file.name);
      const url = BASE_URL + "blog/import";
      const res = await axiosInstance.post(url, form_data);
      if (res.status === 200) {
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
      form_data.append("title", titleRef.current.value);
      const url = BASE_URL + `blog/edit/${id_}`;
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
      fileRef.current.files.length > 0 ? fileRef.current.files[0] : null;
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
                      <input
                        ref={titleRef}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="form-group">
                      <label>Featured Image</label>
                      <input
                        type="file"
                        ref={imageRef}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>VimWiki File</label>
                      <input
                        type="file"
                        ref={fileRef}
                        className="form-control"
                      />
                    </div>
                    <button
                      onClick={submitData}
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
