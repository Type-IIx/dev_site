import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_DOMAIN, BASE_URL } from "../../constants/apiInfo";
import axios from "axios";
import { toast } from "react-toastify";

export default function Bookdetail() {
  const [bookId, setBookId] = useState(-1)
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState();


  const router = useRouter();



  const fethBook = async () => {
    setLoading(true);
    if (bookId !== -1) {
      console.log(`Fetching Article ${bookId}`);
      const url = BASE_URL + `book/${bookId}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        const data = await res.data;
        setBook(data);
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


  const orderBook = () => {
    toast.info("ordering process")
    router.push(`/orderbook/${bookId}`)
  }


  return (
    <>
      <Head>
        <title>{book && book.title ? book.title : ""} </title>
      </Head>
      <Wrapper>
        {!loading && book && bookId !== -1 && <><section className="banner-section page-title">
          <div className="auto-container">
            <div className="content">
              <h1>{book.title}</h1>
            </div>
            <div className="breadcrumb-outer">
              <ul className="page-breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/books">Books</a>
                </li>
                <li>{book.title}</li>
              </ul>
            </div>
          </div>
        </section>

          <section className="course-detail-section">
            <div className="auto-container">
              <div className="row clearfix">
                <div className="content-column col-lg-8 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="course-info-tabs">
                      <div className="course-tabs tabs-box">
                        <div className="tabs-content">
                          <div className="tab active-tab" id="prod-overview">
                            <div className="content" dangerouslySetInnerHTML={{ __html: book.description }}>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info-column col-lg-4 col-md-12 col-sm-12">
                  <div className="inner-column">
                    <div className="video-intro-widget">
                      <div className="intro-video">
                        <img src={BASE_DOMAIN + book.ImageUrl} className="w-100 img-fluid" />
                      </div>
                      <div className="lower-content">
                        <div className="price text-center">
                          ${book.price} {/* <span className="crossed-price">$900</span> */}
                        </div>
                        <div className="buttons-box">
                          <a href={BASE_URL + `book/download/${book.id}`}
                            target="_blank" className="enroll-btn theme-btn" download>
                            Download E-Book
                          </a>
                          <a onClick={orderBook} className="wishlist-btn theme-btn">
                            Order Physical Book
                            <span className="icon fa fa-long-arrow-right"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>}




      </Wrapper>
    </>
  );
}
