import React from "react";
import { BASE_DOMAIN, BASE_URL } from "../constants/apiInfo";
import Link from "next/link";
import { convertFromUSD, formatMBTC } from "../utils/helpers";

function BookCard({ book,rates }) {
  return (
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
          <Link href={`/bookdetails/${book.id}`}>
            <img
              className="transition-500ms"
              src={BASE_DOMAIN + book.ImageUrl}
              alt=""
            />
          </Link>
        </div>
        <div className="lower-content">
          <h5>
            <Link href={`/bookdetails/${book.id}`}>{book.title}</Link>
          </h5>
          <h4 className="price text-blue mb-3">${book.price}</h4>
          <h4 className="price text-blue mb-3">{convertFromUSD(rates, book.price, -1)} BTC <br /> ({formatMBTC(convertFromUSD(rates, book.price, -1))} mBTC)</h4>

          
          {/* <div className="btn-group post-info">
            <a
              href={BASE_URL + `book/download/${book.id}`}
              target="_blank"
              type="button"
              className="btn btn-link btn-sm"
            >
              Download
            </a>
            <button type="button" className="btn btn-link btn-sm">
              Order
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BookCard;
