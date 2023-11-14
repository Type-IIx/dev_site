import React from "react";
import { formatDate } from "../utils/helpers";
import { BASE_DOMAIN } from "../constants/apiInfo";
import { useSession } from "next-auth/react";

function SideArticle({ article }) {
  return (
    <>
      <article className="post">
        <figure className="post-thumb">
          <img src={BASE_DOMAIN + article.fileUrl} alt="" />
          <a href="article-details.html" className="overlay-box">
            <span className="icon fa fa-link"></span>
          </a>
        </figure>
        <div className="text">
          <a href="article-details.html">{article.title}</a>
        </div>
        <div className="post-info">{formatDate(article.created)}</div>
      </article>
    </>
  );
}

export default SideArticle;
