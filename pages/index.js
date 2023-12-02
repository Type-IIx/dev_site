import Head from "next/head";
import Wrapper from "../components/Wrapper";
import { use, useEffect, useState } from "react";
import { BASE_DOMAIN, BASE_URL } from "../constants/apiInfo";
import axios from "axios";
import BookCard from "../components/BookCard";
import { formatDate } from "../utils/helpers";

export default function Home() {

  const [articles, setArticles] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchArticles = async () => {
    const url = BASE_URL + "blog/blogs";
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = await res.data;
      setArticles(data);
    }
  }

  const fetchBooks = async () => {
    const url = BASE_URL + "book/books";
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = await res.data;
      setBooks(data);
    }
  }

  const fetchData = async () => {
    setLoading(true);
    fetchArticles();
    fetchBooks();
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Wrapper>
        <section className="banner-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="title">Welcome to</div>
                  <h1>
                    Coaching & <span>Consultancy</span>
                  </h1>
                </div>
              </div>

              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image" data-tilt data-tilt-max="3">
                    <img src="img/banner.jpg" alt="Banner" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="choose-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image" data-tilt data-tilt-max="3">
                    <img src="img/coaching-2.jpg" alt="" />
                  </div>
                </div>
              </div>

              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sec-title-two">
                    <div className="title">Coaching</div>
                    <h2>I help individuals to become their best version?</h2>
                    <div className="text">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Reference site about Lorem Ipsum,
                      giving information on its origins, as well as a random
                      Lipsum generator.
                    </div>
                  </div>

                  <div className="btn-box">
                    <a href="/coaching" className="theme-btn btn-style-eight">
                      <span className="txt">
                        Enroll Now <i className="flaticon-right-arrow-1"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="course-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="title-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sec-title-two">
                    <div className="title">Consultancy</div>
                    <h2>Lorem Ipsum is simply dummy text</h2>
                    <div className="text">
                      I am glad that you have made it here to send a distress
                      signal, and inform the Senate that all on board were
                      killed. Dantooine. I’m not going to Alderaan. I really got
                      to go. But that to me.
                    </div>
                  </div>

                  <div className="btn-box">
                    <a
                      href="/consultancy"
                      className="theme-btn btn-style-eight"
                    >
                      <span className="txt">
                        Enroll Now <i className="flaticon-right-arrow-1"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="video-column col-lg-6 col-md-12 col-sm-12">
                <div
                  className="inner-column wow fadeInRight"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms"
                >
                  <div
                    className="pattern-layer"
                    style={{
                      backgroundImage:
                        "url(" + "images/background/pattern-1.png" + ")",
                    }}
                  ></div>

                  <div className="video-box">
                    <figure className="video-image">
                      <img
                        className="transition-500ms"
                        src="img/consultancy.jpg"
                        alt="Consultancy"
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="courses-section">
          <div className="auto-container">
            <div className="sec-title-two">
              <div className="title">Books</div>
              <h2>Popular Books</h2>
            </div>
            <div className="row clearfix">
              {books.map((e, i) => {
                if (i < 4) {
                  return <BookCard book={e} key={`home-book-${i}`} />
                }
              })}
              {/* <div className="course-block col-lg-3 col-md-6 col-sm-12">
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
              </div> */}

              {/* <div className="course-block col-lg-3 col-md-6 col-sm-12">
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
              </div> */}
            </div>
          </div>
        </section>

        <section className="news-section-two">
          <div className="auto-container">
            <div className="sec-title-two centered">
              <div className="title color-four">Media</div>
              <h2>News Feeds</h2>
            </div>
            <div className="row clearfix">
              {
                articles.map((e, i) => {
                  if (i < 3) {
                    return <div className="news-block-four col-lg-4 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="image">
                          <a>
                            <img
                              className="transition-500ms"
                              src={BASE_DOMAIN + e.fileUrl}
                              alt=""
                            />
                          </a>
                          <a className="arrow flaticon-right-arrow-1"></a>
                          <Link href={`/article/${e.id}`} className="read-more">read more</Link>
                        </div>
                        <div className="lower-content">
                          <ul className="post-info">
                            <li>{formatDate(e.created)}</li>
                            {/* <li>
                            <a>Consult</a>
                          </li> */}
                          </ul>
                          <h4>
                            <a>{e.title}</a>
                          </h4>
                        </div>
                      </div>
                    </div>
                  }
                })
              }


              {/* <div className="news-block-four col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="image">
                    <a>
                      <img
                        className="transition-500ms"
                        src="img/blog.jpg"
                        alt=""
                      />
                    </a>
                    <a className="arrow flaticon-right-arrow-1"></a>
                    <a className="read-more">read more</a>
                  </div>
                  <div className="lower-content">
                    <ul className="post-info">
                      <li>January 21, 2022</li>
                      <li>
                        <a>Consult</a>
                      </li>
                    </ul>
                    <h4>
                      <a>To carry out put into action performto implement.</a>
                    </h4>
                  </div>
                </div>
              </div>

              <div className="news-block-four col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="image">
                    <a>
                      <img
                        className="transition-500ms"
                        src="img/blog.jpg"
                        alt=""
                      />
                    </a>
                    <a className="arrow flaticon-right-arrow-1"></a>
                    <a className="read-more">read more</a>
                  </div>
                  <div className="lower-content">
                    <ul className="post-info">
                      <li>January 21, 2022</li>
                      <li>
                        <a>Consult</a>
                      </li>
                    </ul>
                    <h4>
                      <a>To carry out put into action performto implement.</a>
                    </h4>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}
