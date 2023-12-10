import Head from "next/head";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/apiInfo";
import BookCard from "../components/BookCard";
import { getRates } from "../utils/helpers";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState(false);


  const fetchBooks = async () => {
    setLoading(true);
    const url = BASE_URL + "book/books";
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = await res.data;
      setBooks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
        <title>Purchase Books</title>
      </Head>
      <Wrapper>
        <section className="banner-section page-title">
          <div className="auto-container">
            <div className="content">
              <div className="text">Welcome to Type-IIx's</div>
              <h1>Books Section</h1>
            </div>
            <div className="breadcrumb-outer">
              <ul className="page-breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Books</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="price-page-section">
          <div className="auto-container">
            <div className="row clearfix">
              {books && rates &&
                !loading &&
                books.map((e, i) => {
                  return <BookCard key={`book-${i}`} book={e} rates={rates} />;
                })}
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}
