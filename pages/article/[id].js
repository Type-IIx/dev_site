import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { useEffect } from "react";
import { BASE_DOMAIN, BASE_URL } from "../../constants/apiInfo";
import axios from "axios";
import { formatDate } from "../../utils/helpers";
import SideArticle from "../../components/SideArticle";

function ArticleDetails() {
  const [articleId, setArticleId] = useState(-1);
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);
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

  const fetchPosts = async () => {
    setLoading(true);
    const url = BASE_URL + "blog/blogs";
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = await res.data;
      setArticles(data);
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
    fetchPosts();
  }, [articleId]);

  return (
    <>
      <Head>
        <title>Article Name</title>
      </Head>

      {articleId !== -1 && article && !loading && (
        <>
          <Wrapper>
            <section className="banner-section page-title">
              <div className="auto-container">
                <div className="content">
                  <h1>{article.title}</h1>
                </div>
                <div className="breadcrumb-outer">
                  <ul className="page-breadcrumb">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/articles">Articles</a>
                    </li>
                    <li>{article.title}</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="sidebar-page-container">
              <div className="auto-container">
                <div className="row clearfix">
                  <div className="content-side col-lg-8 col-md-12 col-sm-12">
                    <div className="blog-detail">
                      <div className="inner-box">
                        <ul className="post-meta">
                          {/* <li>
                            <span className="icon fa fa-user"></span>Author Name
                          </li> */}
                          <li>
                            <span className="icon fa fa-calendar"></span>
                            {formatDate(article.created)}
                          </li>
                        </ul>
                        <div className="main-image">
                          <img src={BASE_DOMAIN + article.fileUrl} alt="" />
                        </div>

                        {/* Content start here */}
                        <div
                          dangerouslySetInnerHTML={{ __html: article.content }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                    <aside className="sidebar sticky-top">
                      <div className="sidebar-widget-two popular-posts">
                        <div className="widget-content">
                          <div className="sidebar-title-two">
                            <h5>More Articles</h5>
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
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        </>
      )}
    </>
  );
}

export default ArticleDetails;
