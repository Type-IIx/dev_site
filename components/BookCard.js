import React from "react";
import { BASE_DOMAIN, BASE_URL } from "../constants/apiInfo";

function BookCard({ book }) {
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
          <a href="#">
            <img
              className="transition-500ms"
              src={BASE_DOMAIN + book.ImageUrl}
              alt=""
            />
          </a>
        </div>
        <div className="lower-content">
          <h5>
            <a href="#">{book.title}</a>
          </h5>
          <h4 className="price text-blue mb-3">${book.price}</h4>
          <div className="btn-group post-info">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
