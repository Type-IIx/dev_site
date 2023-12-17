import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/apiInfo";
import TestimonyCard from "./TestimonyCard";

export default function FooterComp() {
  const [support, setSupport] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonials, setSelectedTestimonials] = useState([]);

  const fetchTestimonials = async () => {
    const url = BASE_URL + "testimonials/all";
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = await res.data;
      setTestimonials(data);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  function getRandomElements(numElements) {
    const remainingArray = testimonials.slice();
    const selectedElements = [];

    for (let i = 0; i < Math.min(numElements, testimonials.length); i++) {
      const randomIndex = Math.floor(Math.random() * remainingArray.length);
      const selectedElement = remainingArray.splice(randomIndex, 1)[0];
      selectedElements.push(selectedElement);
    }
    setSelectedTestimonials(selectedElements);
  }

  useEffect(() => {
    getRandomElements(5);
  }, [testimonials]);

  const handleContact = async (e) => {
    e.preventDefault();

    const resp = await axios.post(BASE_URL + "submissions/support", support);
    if (resp.status === 200) {
      const data = await resp.data;
      toast.success("Success");
    } else {
      toast.error("Failed saving checkout form");
    }
  };

  const handleChange = (e) => {
    let temp = { ...support };
    temp[e.target.name] = e.target.value;
    setSupport(temp);
  };

  return (
    <>
      <section className="testimonial-section">
        <div className="auto-container">
          <div className="sec-title-two centered">
            <div className="title color-four">Testimonials</div>
            <h2>
              See what my clients <br /> say about me.
            </h2>
          </div>
          <div className="row clearfix">
            {selectedTestimonials.map((e, i) => (
              <TestimonyCard
                key={`testimonial-card-${i}`}
                name={e.name}
                content={e.content}
                rating={e.rating}
                image={e.fileUrl}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column">
                <div className="image-two">
                  <img
                    src="/img/Ampouletude-Support-footer-900-660-0.png"
                    alt=""
                  />
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
                          name="name"
                          value={support.name}
                          onChange={handleChange}
                          placeholder="Enter Name"
                          required
                        />
                      </div>

                      <div className="form-group col-lg-6 col-md-6 col-sm-12">
                        <span className="icon flaticon-envelope"></span>
                        <input
                          type="email"
                          name="email"
                          value={support.email}
                          onChange={handleChange}
                          placeholder="E-Mail Address"
                          required
                        />
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <span className="icon flaticon-notebook"></span>
                        <select
                          className="custom-select-box"
                          name="subject"
                          value={support.subject}
                          onChange={handleChange}
                        >
                          <option>Select Subject</option>
                          <option value="Support">Support</option>
                        </select>
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <span className="icon flaticon-pen"></span>
                        <textarea
                          name="message"
                          value={support.message}
                          onChange={handleChange}
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
                <div className="copyright">Ampouletude ©</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
