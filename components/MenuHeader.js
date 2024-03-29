import { FaTelegramPlane } from "react-icons/fa";
import { TbBrandMatrix } from "react-icons/tb";
import { SiXmpp } from "react-icons/si";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/apiHandler";
import { BASE_URL, path_ } from "../constants/apiInfo";
import axios from "axios";

export default function MenuHeader() {
  const [socials, setSocials] = useState(null);
  const [others, setOthers] = useState({
    call: "",
    coaching: "",
    authors: "",
    consultancy: "",
  });
  const [openMenu, setOpenMenu] = useState(false);

  const fetchOthers = async () => {
    const resp = await axios.get(BASE_URL + path_ + "other");

    if (resp.status === 200) {
      const result = await resp.data;
      setOthers(result);
    }
  };

  const fetchURLs = async () => {
    const resp = await axiosInstance.get(BASE_URL + "settings");
    if (resp.status === 200) {
      const result = await resp.data;

      let temp = {};
      for (const elem of result) {
        temp[elem.name] = elem;
      }
      console.log(temp);
      setSocials(temp);
    }
  };

  useEffect(() => {
    console.log("fetching urls");
    fetchURLs();
    fetchOthers();
  }, []);

  return (
    <>
      <header className="main-header header-style-two">
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container clearfix">
              <div className="top-left clearfix">
                <div className="text">
                  {socials !== null && (
                    <ul className="social-box py-2">
                      {socials.telegram && socials.telegram.url.length > 0 && (
                        <li className="">
                          <Link href={socials.telegram.url}>
                            <FaTelegramPlane />
                          </Link>
                        </li>
                      )}

                      {socials.matrix && socials.matrix.url.length > 0 && (
                        <li className="">
                          <Link href={socials.matrix.url}>
                            <TbBrandMatrix />
                          </Link>
                        </li>
                      )}

                      {socials.xmpp && socials.xmpp.url.length > 0 && (
                        <li className="">
                          <Link href={socials.xmpp.url}>
                            <SiXmpp />
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <div className="top-right pull-right clearfix ">
                <div className="text">
                  Call for free consultation:{" "}
                  <a href={`tel:${others.call}`}>{others.call}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-lower">
          <div className="auto-container clearfix">
            <div className="pull-left logo-box">
              <div className="logo">
                <a href="/">
                  <img src="/img/logo.png" alt="" title="" />
                </a>
              </div>
            </div>

            <div
              className="nav-outer clearfix"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              <div className="mobile-nav-toggler">
                <span className="icon flaticon-menu-1"></span>
              </div>

              <nav className="main-menu navbar-expand-md">
                <div className="navbar-header">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                </div>

                <div
                  className="navbar-collapse collapse clearfix"
                  id="navbarSupportedContent"
                >
                  <ul className="navigation clearfix">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/coaching">Coaching</a>
                    </li>
                    <li>
                      <a href="/consultancy">Consultancy</a>
                    </li>
                    <li>
                      <a href="/writing">Writing</a>
                    </li>
                    <li>
                      <a href="/books">Books</a>
                    </li>
                    <li>
                      <a href="/articles">Articles</a>
                    </li>
                    <li>
                      <a href="/client-success">Clients success</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${openMenu ? "" : "hidden-menu"}`}>
          <div
            className="menu-backdrop"
            onClick={() => setOpenMenu(false)}
          ></div>
          <div className="close-btn" onClick={() => setOpenMenu(false)}>
            <span className="icon flaticon-multiply"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <a href="/">
                <img src="/img/logo-small.png" alt="" title="" />
              </a>
            </div>
            <div className="menu-outer">
              <div
                class="navbar-collapse collapse clearfix"
                id="navbarSupportedContent"
              >
                <ul class="navigation clearfix">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/coaching">Coaching</a>
                  </li>
                  <li>
                    <a href="/consultancy">Consultancy</a>
                  </li>
                  <li>
                    <a href="/writing">Writing</a>
                  </li>
                  <li>
                    <a href="/books">Books</a>
                  </li>
                  <li>
                    <a href="/articles">Articles</a>
                  </li>
                  <li>
                    <a href="/client-success">Clients success</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
