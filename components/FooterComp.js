import { toast } from "react-toastify";

export default function FooterComp() {

  const handleContact = () => {
    toast.info("processing")
  }

  return (
    <>
      <section className="testimonial-section">
        <div className="auto-container">
          <div className="sec-title-two centered">
            <div className="title color-four">Testimonials</div>
            <h2>
              Hear out what my clients <br /> say about me.
            </h2>
          </div>
          <div className="testimonial-carousel  owl-theme">
            <div className="testimonial-block">
              <div className="inner-box">
                <div className="upper-box">
                  <span className="quote-icon flaticon-quote-3"></span>
                  <div className="rating">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <div className="text">
                    "You have been an absolutely incredible coach tho. It has
                    been an honor working with you and I really did learn alot
                    and am very happy with progress we have made. I would
                    literally take you over Hany Rambod or any other Olympia
                    level coach and it wouldnt even be close. Truly believe you
                    are one of the if not thee most knowledgeable coachs in
                    bodybuilding. Its highly unlikely but if i reach my goal and
                    my plans change and i do decide to compete I would love to
                    work with you again. Plan to continue on the plan we have
                    laid out for now."
                  </div>
                </div>
                <div className="lower-box">
                  <div className="box-inner">
                    <div className="author-image">
                      <img src="img/brazil.png" alt="" />
                    </div>
                    <h5>Alaxis D. Dowson</h5>
                    <div className="designation">During Coaching</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-block">
              <div className="inner-box">
                <div className="upper-box">
                  <span className="quote-icon flaticon-quote-3"></span>
                  <div className="rating">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <div className="text">
                    "After Coaching, everything has been going great. I dont
                    even understand how i lost a decently significant amount of
                    fat AND got stronger while eating what i estimate to be
                    maintenance calories. Always thought recomping was bullshit
                    and a waste of time and bulk/cut was more efficient..."
                  </div>
                </div>
                <div className="lower-box">
                  <div className="box-inner">
                    <div className="author-image">
                      <img src="img/usa.png" alt="" />
                    </div>
                    <h5>SmallOnGear</h5>
                    <div className="designation">During Coaching</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-block">
              <div className="inner-box">
                <div className="upper-box">
                  <span className="quote-icon flaticon-quote-3"></span>
                  <div className="rating">
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                    <span className="fa fa-star"></span>
                  </div>
                  <div className="text">
                    "[Our consult has been] high quality and adapted to [my]
                    individual requirements. [Your] statements are always
                    comprehensible, differentiated and backed up by science. I
                    am very satisfied to work with [you]."
                  </div>
                </div>
                <div className="lower-box">
                  <div className="box-inner">
                    <div className="author-image">
                      <img src="img/germany.png" alt="" />
                    </div>
                    <h5>SonOfThor</h5>
                    <div className="designation">During Consultancy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image">
                  <img src="img/contact-1.jpg" alt="" />
                </div>
                <div className="image-two">
                  <img src="img/contact-2.jpg" alt="" />
                </div>
              </div>
            </div>

            <div className="form-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="sec-title-two">
                  <div className="title color-three">Get In Touch</div>
                  <h2>Make Custom Request</h2>
                </div>

                <div className="contact-form">
                  <form method="post" action="#">
                    <div className="row clearfix">
                      <div className="form-group col-lg-6 col-md-6 col-sm-12">
                        <span className="icon flaticon-user-4"></span>
                        <input
                          type="text"
                          name="username"
                          placeholder="Enter Name"
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12">
                        <span className="icon flaticon-envelope"></span>
                        <input
                          type="email"
                          name="email"
                          placeholder="E-Mail Address"
                          required
                        />
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <span className="icon flaticon-notebook"></span>
                        <select name="country" className="custom-select-box">
                          <option>Select Subject</option>
                          <option>Subject 01</option>
                          <option>Subject 02</option>
                          <option>Subject 03</option>
                          <option>Subject 04</option>
                        </select>
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <span className="icon flaticon-pen"></span>
                        <textarea
                          name="message"
                          placeholder="Message"
                        ></textarea>
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <button
                          className="theme-btn btn-style-eight"
                          type="submit"
                          name="submit-form"
                          onClick={handleContact}
                        >
                          <span className="txt">Contact Us</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer
        className="footer-style-two"
        style={{
          backgroundImage: "url(" + "url(images/background/3.jpg)" + ")",
        }}
      >
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="clearfix">
              <div className="pull-left">
                <div className="copyright">
                  &copy; <a>Coaching & Consultancy</a> - 2023 Alright Reserved
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
