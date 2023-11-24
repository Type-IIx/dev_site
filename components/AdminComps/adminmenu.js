import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Menu() {
  return (
    <>
      <header className="main-header header-style-two">
        <div className="header-top">
          <div className="auto-container clearfix">
            <div className="pull-left logo-box">
              <div className="logo">
                <a href="/">
                  <img src="img/logo.png" alt="" title="" />
                </a>
              </div>
            </div>

            <div className="nav-outer clearfix">
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
                      <Link href="/articles">Blog</Link>
                    </li>
                    <li>
                      <Link href="/admpanel/addblog">Add Blog</Link>
                    </li>
                    <li>
                      <Link href="/admpanel/booklist">Books</Link>
                    </li>
                    <li>
                      <Link href="/admpanel/settings">Settings</Link>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          signOut();
                        }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-multiply"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <a href="/">
                <img src="img/logo-small.png" alt="" title="" />
              </a>
            </div>
            <div className="menu-outer"></div>
          </nav>
        </div>
      </header>
    </>
  );
}
