import Head from "next/head";
import Wrapper from "../components/Wrapper";

export default function Books() {
  return (
    <>
      <Head>
        <title>Purchase books</title>
      </Head>
      <Wrapper>
        <section className="banner-section page-title">
          <div className="auto-container">
            <div className="content">
              <div className="text">Welcome to our</div>
              <h1>Books Section</h1>
            </div>
            <div className="breadcrumb-outer">
              <ul className="page-breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Books</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="price-page-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="course-block col-lg-3 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft animated"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms"
                  style={{
                    visibility: "visible",
                    animationDuration: "1500ms",
                    animationDelay: "0ms",
                    animationName: "fadeInLeft",
                  }}
                >
                  <div className="image">
                    <a href="#">
                      <img
                        className="transition-500ms"
                        src="img/book.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="lower-content">
                    <h5>
                      <a href="#">How to success through market segmentation</a>
                    </h5>
                    <h4 className="price text-blue mb-3">$29.00</h4>
                    <div className="btn-group post-info">
                      <button type="button" className="btn btn-link btn-sm">
                        Download
                      </button>
                      <button type="button" className="btn btn-link btn-sm">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="course-block col-lg-3 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft animated"
                  data-wow-delay="150ms"
                  data-wow-duration="1500ms"
                  style={{
                    visibility: "visible",
                    animationDuration: "1500ms",
                    animationDelay: "150ms",
                    animationName: "fadeInLeft",
                  }}
                >
                  <div className="image">
                    <a href="#">
                      <img
                        className="transition-500ms"
                        src="img/book2.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="lower-content">
                    <h5>
                      <a href="#">How to success through market segmentation</a>
                    </h5>
                    <h4 className="price text-blue mb-3">$29.00</h4>
                    <div className="btn-group post-info">
                      <button type="button" className="btn btn-link btn-sm">
                        Download
                      </button>
                      <button type="button" className="btn btn-link btn-sm">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="course-block col-lg-3 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft animated"
                  data-wow-delay="300ms"
                  data-wow-duration="1500ms"
                  style={{
                    visibility: "visible",
                    animationDuration: "1500ms",
                    animationDelay: "300ms",
                    animationName: "fadeInLeft",
                  }}
                >
                  <div className="image">
                    <a href="#">
                      <img
                        className="transition-500ms"
                        src="img/book3.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="lower-content">
                    <h5>
                      <a href="#">How to success through market segmentation</a>
                    </h5>
                    <h4 className="price text-blue mb-3">$29.00</h4>
                    <div className="btn-group post-info">
                      <button type="button" className="btn btn-link btn-sm">
                        Download
                      </button>
                      <button type="button" className="btn btn-link btn-sm">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="course-block col-lg-3 col-md-6 col-sm-12">
                <div
                  className="inner-box wow fadeInLeft animated"
                  data-wow-delay="450ms"
                  data-wow-duration="1500ms"
                  style={{
                    visibility: "visible",
                    animationDuration: "1500ms",
                    animationDelay: "450ms",
                    animationName: "fadeInLeft",
                  }}
                >
                  <div className="image">
                    <a href="#">
                      <img
                        className="transition-500ms"
                        src="img/book4.jpg"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="lower-content">
                    <h5>
                      <a href="#">How to success through market segmentation</a>
                    </h5>
                    <h4 className="price text-blue mb-3">$29.00</h4>
                    <div className="btn-group post-info">
                      <button type="button" className="btn btn-link btn-sm">
                        Download
                      </button>
                      <button type="button" className="btn btn-link btn-sm">
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}
