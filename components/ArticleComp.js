import React from "react";
import { BASE_DOMAIN } from "../constants/apiInfo";
import { formatDate } from "../utils/helpers";
import { useSession } from "next-auth/react";
import { AiTwotoneEdit } from "react-icons/ai";
import Link from "next/link";

function ArticleComp({ article }) {
  const session = useSession();
  return (
    <>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <Link href={`/article/${article.id}`}>
          <div className="news-block-two">
            <div className="inner-box">
              <div className="image">
                <a>
                  <img
                    className="transition-500ms"
                    src={BASE_DOMAIN + article.fileUrl}
                    alt=""
                  />
                </a>
              </div>
              <div className="lower-content">
                {session.status === "authenticated" && false && (
                  <div className="author-box place-center">
                    {/* <div className="box-inner"> */}
                    <Link href={`/admpanel/editblog/${article.id}`}>
                      <AiTwotoneEdit />
                    </Link>

                    {/* </div> */}
                  </div>
                )}

                <h3>
                  <a>{article.title}</a>
                </h3>
                {/* <div className="text">
                          Novia's spaciously two bedroom apartments are perfect
                          for families and even business partners. Look out into
                          the Manhattan skyline from the open fully equipped
                          kitchen.
                        </div> */}
                <ul className="post-meta">
                  {/* <li>
                            <span className="icon fa fa-eye"></span>100 Views
                          </li>
                          <li>
                            <span className="icon fa fa-comments"></span>30
                            comments
                          </li> */}
                  <li>
                    <span className="icon fa fa-calendar"></span>
                    {formatDate(article.created)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ArticleComp;
