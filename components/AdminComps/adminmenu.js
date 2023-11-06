export default function Menu() {
  return (
    <>
      <header className="main-header header-style-two">
        {/* <div className="header-top">
          <div className="auto-container">
            <div className="inner-container clearfix">
              <div className="top-left clearfix">
                <div className="text">
                  <span>Working time:</span> Monday to Friday 9 AM - 5 PM
                </div>
              </div>

              <div className="top-right pull-right clearfix">
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
                <div className="text">
                  Call for free consultation:{" "}
                  <a href="tel:+0056-693-55-20">0056 693 55 20</a>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
                      <a href="/blog">Blog</a>
                    </li>
                    <li>
                      <a href="/settings">Settings</a>
                    </li>
                    <li>
                      <a href="/login">Logout</a>
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
