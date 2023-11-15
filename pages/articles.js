import Head from "next/head";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/apiInfo";
import axios from "axios";
import ArticleComp from "../components/ArticleComp";
import SideArticle from "../components/SideArticle";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [splited, setSplited] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  const splitArticles = (data) => {
    const limit = 10;
    if (data.length <= limit) {
      setSplited([data]);
    } else {
      let final = [];
      let temp = [];
      for (const d of data) {
        if (temp.length === limit) {
          final.push(temp);
          temp = [d];
        } else {
          temp.push(d);
        }
      }
      if (temp.length > 0) {
        final.push(temp);
      }
      setSplited(final);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    const url = BASE_URL + "blog/blogs";
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = await res.data;
      setArticles(data);
      splitArticles(data);
    }
    setLoading(false);
  };

  const handlePagination = (step) => {
    if (active + step < 0) {
      setActive(splited.length - 1);
    } else if (active + step >= splited.length) {
      setActive(0);
    } else {
      setActive((old) => old + step);
    }
  };

  return (
    <>
      <Head>
        <title>News Feed</title>
      </Head>
      <Wrapper>
        <section className="banner-section page-title">
          <div className="auto-container">
            <div className="content">
              <div className="text">Welcome to our</div>
              <h1>Some News from us</h1>
            </div>
            <div className="breadcrumb-outer">
              <ul className="page-breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>Articles</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="sidebar-page-container">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="content-side col-md-12">
                <div className="blog-classic">
                  <div className="row clearfix">
                    {splited[active] &&
                      splited[active].map((e, i) => {
                        return <ArticleComp article={e} key={`article-${i}`} />;
                      })}
                  </div>

                  <ul className="styled-pagination text-center">
                    <li className="prev">
                      <a onClick={() => handlePagination(-1)}>
                        <span className="fa fa-angle-double-left"></span>
                      </a>
                    </li>
                    {new Array(splited.length).fill(0).map((e, i) => {
                      return (
                        <>
                          <li>
                            <a
                              onClick={() => {
                                setActive(i);
                              }}
                              className={`${active === i ? "active" : ""}`}
                            >
                              {i + 1}
                            </a>
                          </li>
                        </>
                      );
                    })}

                    <li className="next">
                      <a onClick={() => handlePagination(1)}>
                        <span className="fa fa-angle-double-right"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar sticky-top">
                  <div className="sidebar-widget-two about-widget">
                    <div className="widget-content">
                      <div className="sidebar-title-two">
                        <h5>About Me</h5>
                      </div>
                      {/*  <div className="image">
                        <img src="images/resource/about-widget.jpg" alt="" />
                      </div> 
                      <div className="lower-content">
                        <h6>Rosalina D. Willaimson</h6>
                        <div className="text">
                          Lorem ipsum dolor sit amet, consect etur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore.
                        </div>

                        <ul className="social-box">
                          <li>
                            <a
                              href="https://www.facebook.com/"
                              className="fa fa-facebook-f"
                            ></a>
                          </li>
                          <li>
                            <a
                              href="https://www.twitter.com/"
                              className="fa fa-twitter"
                            ></a>
                          </li>
                          <li>
                            <a
                              href="https://www.behance.com/"
                              className="fa fa-behance"
                            ></a>
                          </li>
                          <li>
                            <a
                              href="https://www.linkedin.com/"
                              className="fa fa-linkedin"
                            ></a>
                          </li>
                          <li>
                            <a
                              href="https://youtube.com/"
                              className="fa fa-youtube-play"
                            ></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* <div className="sidebar-widget-two about-widget">
                    <div className="widget-content">
                      <div className="sidebar-title-two">
                        <h5>Search Here</h5>
                      </div>

                      <div className="sidebar-widget search-box">
                        <form method="post" action="contact.html">
                          <div className="form-group">
                            <input
                              type="search"
                              name="search-field"
                              value=""
                              placeholder="Search your keyword..."
                              required
                            />
                            <button type="submit">
                              <span className="icon fa fa-search"></span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div> 
                  <div className="sidebar-widget-two popular-posts">
                    <div className="widget-content">
                      <div className="sidebar-title-two">
                        <h5>Popular Feeds</h5>
                      </div>

                      {articles.map((e, i) => {
                        if (i < 4) {
                          return (
                            <SideArticle
                              article={e}
                              key={`side-article-${i}`}
                            />
                          );
                        }
                      })}
                    </div>
                  </div>
                  {/* <div className="sidebar-widget-two category-widget-two">
                    <div className="widget-content">
                      <div className="sidebar-title-two">
                        <h5>Categories</h5>
                      </div>
                      <ul className="cat-list-two">
                        <li>
                          <a href="#">
                            Business<span>26</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Consultant<span>30</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Creative<span>71</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            UI/UX<span>56</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            Technology<span>60</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> 
                </aside>
              </div> */}
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

{
  /* <div className="news-block-two">
                    <div className="inner-box">
                      <div className="image">
                        <img
                          className="transition-500ms"
                          src="images/resource/news-2.jpg"
                          alt=""
                        />
                        <a
                          href="https://www.youtube.com/watch?v=kxPCFljwJws"
                          className="lightbox-image overlay-box"
                        >
                          <span className="flaticon-play-arrow">
                            <i className="ripple"></i>
                          </span>
                        </a>
                      </div>
                      <div className="lower-content">
                        <div className="category">Business</div>
                        <div className="author-box">
                          <div className="box-inner">
                            <div className="author-image">
                              <img src="images/resource/author-4.jpg" alt="" />
                            </div>
                            by Hetmayar
                          </div>
                        </div>
                        <h3>
                          <a href="article-details.html">
                            Dharma Home Suites at Novia offers fully plain
                            furnished apartments to fit
                          </a>
                        </h3>
                        <div className="text">
                          Novia's spaciously two bedroom apartments are perfect
                          for families and even business partners. Look out into
                          the Manhattan skyline from the open fully equipped
                          kitchen.
                        </div>
                        <ul className="post-meta">
                          <li>
                            <span className="icon fa fa-eye"></span>100 Views
                          </li>
                          <li>
                            <span className="icon fa fa-comments"></span>30
                            comments
                          </li>
                          <li>
                            <span className="icon fa fa-calendar"></span>24th
                            March 2022
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="news-block-two">
                    <div className="inner-box">
                      <div className="image">
                        <a href="article-details.html">
                          <img
                            className="transition-500ms"
                            src="images/resource/news-3.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="lower-content">
                        <div className="category">Business</div>
                        <div className="author-box">
                          <div className="box-inner">
                            <div className="author-image">
                              <img src="images/resource/author-4.jpg" alt="" />
                            </div>
                            by Hetmayar
                          </div>
                        </div>
                        <h3>
                          <a href="article-details.html">
                            Dharma Home Suites at Novia offers fully plain
                            furnished apartments to fit
                          </a>
                        </h3>
                        <div className="text">
                          Novia's spaciously two bedroom apartments are perfect
                          for families and even business partners. Look out into
                          the Manhattan skyline from the open fully equipped
                          kitchen.
                        </div>
                        <ul className="post-meta">
                          <li>
                            <span className="icon fa fa-eye"></span>100 Views
                          </li>
                          <li>
                            <span className="icon fa fa-comments"></span>30
                            comments
                          </li>
                          <li>
                            <span className="icon fa fa-calendar"></span>24th
                            March 2022
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="news-block-two">
                    <div className="inner-box">
                      <div className="image">
                        <a href="article-details.html">
                          <img
                            className="transition-500ms"
                            src="images/resource/news-4.jpg"
                            alt=""
                          />
                        </a>
                      </div>
                      <div className="lower-content">
                        <h3>
                          <a href="article-details.html">
                            Dharma Home Suites at Novia offers fully plain
                            furnished apartments to fit
                          </a>
                        </h3>
                        <div className="text">
                          Novia's spaciously two bedroom apartments are perfect
                          for families and even business partners. Look out into
                          the Manhattan skyline from the open fully equipped
                          kitchen.
                        </div>
                        <ul className="post-meta">
                          <li>
                            <span className="icon fa fa-eye"></span>100 Views
                          </li>
                          <li>
                            <span className="icon fa fa-comments"></span>30
                            comments
                          </li>
                          <li>
                            <span className="icon fa fa-calendar"></span>24th
                            March 2022
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="news-block-two style-two">
                    <div className="inner-box">
                      <div className="lower-content">
                        <h3>
                          <a href="article-details.html">
                            Dharma Home Suites at Novia offers fully plain
                            furnished apartments to fit
                          </a>
                        </h3>
                        <div className="text">
                          Novia's spaciously two bedroom apartments are perfect
                          for families and even business partners. Look out into
                          the Manhattan skyline from the open fully equipped
                          kitchen.
                        </div>
                        <ul className="post-meta">
                          <li>
                            <span className="icon fa fa-eye"></span>100 Views
                          </li>
                          <li>
                            <span className="icon fa fa-comments"></span>30
                            comments
                          </li>
                          <li>
                            <span className="icon fa fa-calendar"></span>24th
                            March 2022
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div> */
}
