import Head from "next/head";
import Wrapper from "../components/Wrapper";
import { use, useEffect, useState } from "react";
import { BASE_DOMAIN, BASE_URL } from "../constants/apiInfo";
import axios from "axios";
import BookCard from "../components/BookCard";
import { formatDate, getRates } from "../utils/helpers";
import Link from "next/link";

export default function Home() {

  const [articles, setArticles] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [rates, setRates] = useState(false);


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


  async function updateRates() {
    let d = await getRates();
    setRates(d);
  }


  // effects here
  

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 15000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <Head>
        <title>Ampouletude: Home of Type-IIx</title>
      </Head>

      <Wrapper>
        <section className="banner-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="title">Welcome to</div>
                  <h1>
                    Ampouletude: Home of Type-IIx – <span>Coaching &amp; Consultancy</span>
                  </h1>
                </div>
              </div>

              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image" data-tilt data-tilt-max="3">
                    <img src="/img/logo-full.png" alt="Logo (Full)" />
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
                    <img src="/img/services-comparison-chart.png" alt="Services Comparison (Chart)" />
                  </div>
                </div>
              </div>

              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sec-title-two">
                    <div className="title">Services</div>
                    <h2>Consulting, Writing, &amp; Coaching</h2>
                    <div className="text">
                      <h3>Consulting</h3>
                      <ul>
                        <li><em>Individualized Protocol</em>: Individually tailored physique-enhancement protocols oriented towards bulking, cutting, or recomp</li>
                        <li><em>Bloodwork Monitoring</em>: Review of bloodwork values for the purpose of physique enhancement</li>
                    </ul>
                      <em>Note</em>: If routine laboratory bloodwork has not been performed, the Coach may elect to educate &amp; inform the Client about best practices for self-monitoring these values for the purpose of physique enhancement.

                      <h3>Writing</h3>
                      <ul>
                        <li>Attentive &amp; crafted solutions after private consultation, an in-depth analysis, &amp; review of supporting materials</li>
                    </ul>
                        <em>Note</em>: Portfolio available upon request. See: <a href="https://thinksteroids.com/author/type-iix/" alt="MesoRx Articles">MesoRx [www]</a> &amp; <a href="/articles/">Articles [www]</a> for some publicly available samples.

                    <h3>Coaching</h3>
                    <ul>
                        <li><em>Training Planning (Programming)</em>: Planned, nonlinear, progressive overload (periodisation) as a principle is applied, using training methods that include intensification, e.g., DC Rest-Pause Clusters. Mesocycles proceed in blocks of 8 – 16 weeks</li>
                        <li><em>Nutrition Planning Strategies &amp; Tactics</em>: A cyclical structure, the complexity of which depends on training status (e.g., intermediate, very advanced) &amp; the training program, is applied to serve either bulking, cutting, or recomp</li>
                        <li><em>Individualized Protocol</em>: Individually tailored physique-enhancement protocols oriented towards bulking, cutting, or recomp</li>
                    </ul>

                    </div>
                  </div>

                  <div className="btn-box">
                    <a href="/coaching" className="theme-btn btn-style-eight">
                      <span className="txt">
                        Sign Up for Coaching<i className="flaticon-right-arrow-1"></i>
                      </span>
                    </a>
                  </div>
                  <br />
                  <div className="btn-box">
                    <a href="/writing" className="theme-btn btn-style-eight">
                        <span className="txt">
                            Commission for Writing<i className="flaticon-right-arrow-1"></i>
                        </span>
                    </a>
                </div>
                <br />
                <div className="btn-box">
                    <a href="/consultancy" className="theme-btn btn-style-eight">
                        <span className="txt">
                            Sign Up for Consulting<i className="flaticon-right-arrow-1"></i>
                        </span>
                    </a>
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
                    <div className="title">Coaching Workflow</div>
                    <h2>The Coaching Life-Cycle</h2>
                    <div className="text">
                      Coaching proceeds through a cyclical workflow. The Client reports scale weight (kg, lb) daily, required training sessions items on a per-session basis,
                      weekly calipers skinfold measures, and the Coach generates reports from these data to manage rolling average changes to scale weight, &amp; to adjust the training load.
                      Every three weeks, the Client reports poses (photos), including mandatory poses &amp; select poses based on subjective (visual) assessment of weak points.
                    </div>
                  </div>
                </div>
              </div>

              <div className="video-column col-lg-6 col-md-12 col-sm-12">
                <div
                  className="inner-column wow fadeInRight"
                  data-wow-delay="0ms"
                  data-wow-duration="1500ms"
                >
                  <img
                    src="/img/workflow.png"
                    alt="Coaching Workflow"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
{/*
        </section>
              <div className="content-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="sec-title-two">
                    <div className="title">Consulting</div>
                    <h2></h2>
                    <div className="text">
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
                        "url(" + "/images/background/pattern-1.png" + ")",
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
*/}
        <section class="price-page-section">
          <div class="auto-container">
            <div class="sec-title-two centered">
              <h2>Services</h2>
            </div>
            <div class="row clearfix">
              <div class="price-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="title">Consulting</div>
                  <div class="date"></div>
                  <ul class="price-options">
                    <li>Individualized protocol</li>
                    <li>Objective oriented (bulking vs cutting vs recomp)</li>
                    <li>Bloodwork monitoring</li>
                  </ul>
                  <div class="button-box text-center">
                    <a href="/consultancy" class="purchase-btn theme-btn">
                      $100/Month
                    </a>
                  </div>
                </div>
              </div>

              <div class="price-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="title">Writing</div>
                  <div class="date"></div>
                  <ul class="price-options">
                    <li>Unlimited projects</li>
                    <li>Unlimited revision</li>
                    <li>Flexible timeline</li>
                    <li>Private consultation</li>
                    <li>Attentive &amp; crafted solutions</li>
                  </ul>
                  <div class="button-box text-center">
                    <a href="/writing" class="purchase-btn theme-btn">
                      $300/Writing
                    </a>
                  </div>
                </div>
              </div>

              <div class="price-block col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                  <div class="title">Coaching</div>
                  <div class="date"></div>
                  <ul class="price-options">
                    <li>Training program design</li>
                    <li>Individualized protocol</li>
                    <li>Nutrition planning</li>
                    <li>Body composition monitoring</li>
                    <li>Bloodwork management</li>
                  </ul>
                  <div class="button-box text-center">
                    <a href="/coaching" class="purchase-btn theme-btn">
                      $250 1st Month &amp; $350/Month Thereafter
                    </a>
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
              {rates && books.map((e, i) => {
                if (i < 4) {
                  return <BookCard book={e} key={`home-book-${i}`} rates={rates} />
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
