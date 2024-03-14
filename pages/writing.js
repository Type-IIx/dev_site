import Head from "next/head";

import { useEffect, useRef, useState } from "react";
import {
  convertFromUSD,
  formatAndShowErrors,
  formatMBTC,
  getRates,
} from "../utils/helpers";
import { Currencies } from "../constants/enums";
import { AUTHORSHIP, SYMBOLS } from "../constants/prices";
import { AuthorForm } from "../parsers/schema";
import { toast } from "react-toastify";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { BASE_URL, path_ } from "../constants/apiInfo";

export default function Writings() {
  const [rates, setRates] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(Currencies.USD);
  const [authorships, setAuthorShips] = useState(1);
  const [checked, setChecked] = useState(false);
  const [prices, setPrices] = useState({
    authorships: AUTHORSHIP,
    total: AUTHORSHIP,
    bitcoinTotal: 0,
  });

  const [formData, setFormData] = useState({
    email: "",
    website: "",
    subject: "",
  });

  const MarketingRef = useRef();
  const EducationRef = useRef();
  const ResearchRef = useRef();
  const OpinionRef = useRef();
  const OthersRef = useRef();
  const agreementRef = useRef();

  const [others, setOthers] = useState({
    call: "",
    coaching: "",
    authors: "",
    consultancy: "",
  });

  const [captcha, setCaptcha] = useState(null);
  const captchaRef = useRef();

  const fetchCaptcha = async () => {
    const resp = await axios.get(BASE_URL + "captcha/generate");
    if (resp.status === 200) {
      const result = await resp.data;
      setCaptcha(result);
    }
  };

  const fetchOthers = async () => {
    const resp = await axios.get(BASE_URL + path_ + "other");

    if (resp.status === 200) {
      const result = await resp.data;
      setOthers(result);
    }
  };

  // handlers here

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleAuthorShipsChange = (e) => {
    try {
      if (Number(e.target.value) >= 1 && Number(e.target.value) <= 5) {
        setAuthorShips(Number(e.target.value));
      }
    } catch {}
  };

  async function updateRates() {
    let d = await getRates();
    setRates(d);
  }

  // effects here

  useEffect(() => {
    fetchOthers();
    fetchCaptcha();
  }, []);

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rates) {
      updatePrices();
    }
  }, [selectedCurrency, rates, authorships]);

  const updatePrices = () => {
    let temp = { ...prices };
    temp.authorships = convertFromUSD(rates, AUTHORSHIP, selectedCurrency);
    let newTotal = AUTHORSHIP * authorships;
    temp.total = convertFromUSD(rates, newTotal, selectedCurrency);
    temp.bitcoinTotal = convertFromUSD(rates, newTotal, -1);
    setPrices(temp);
  };

  // form handler

  const formHandler = (e) => {
    //console.log(`Handling Change on field ${k} : ${v}`);
    let k = e.target.name;
    let v = e.target.value;
    let temp = { ...formData };
    temp[k] = v;
    setFormData(temp);
  };

  const clearForm = () => {
    setFormData({
      email: "",
      website: "",
      subject: "",
    });
    setSelectedCurrency(Currencies.USD);
    setAuthorShips(1);
    MarketingRef.current.checked = false;
    EducationRef.current.checked = false;
    ResearchRef.current.checked = false;
    OpinionRef.current.checked = false;
    OthersRef.current.checked = false;
    captchaRef.current.value = "";
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (checked) {
        const result = AuthorForm.safeParse(formData);
        if (!result.success) {
          const errors = result.error.issues;
          console.log(errors);
          formatAndShowErrors(toast, errors);
        } else {
          let temp = [];
          console.log(MarketingRef.current);
          console.log(EducationRef.current);
          console.log(ResearchRef.current);
          console.log(OpinionRef.current);
          console.log(OthersRef.current);
          if (MarketingRef.current.checked) {
            temp.push("Marketing");
          }
          if (EducationRef.current.checked) {
            temp.push("Education");
          }
          if (ResearchRef.current.checked) {
            temp.push("Research");
          }
          if (OpinionRef.current.checked) {
            temp.push("Opinion");
          }
          if (OthersRef.current.checked) {
            temp.push("Others");
          }

          const body = {
            ...formData,
            agreement: agreementRef.current.value,
            authorships,
            fee_string: `${SYMBOLS[selectedCurrency]} ${prices.total}`,
            intent: temp.join(","),
          };
          console.log(body);
          const finalBody = {
            captcha: {
              id: captcha.capId,
              answer: captchaRef.current.value,
            },
            body,
          };
          const url = BASE_URL + "submissions/authors/create";
          const res = await axios.post(url, finalBody);
          if (res) {
            toast.success("Success");
            clearForm();
          } else {
            toast.error("Failed Saving submission");
          }
        }
      } else {
        toast.error("Agree to terms");
      }
    } catch (e) {
      console.log(e);
      const data = await e.response.data;
      console.log(data);
      if (data && data.reason) {
        toast.error(data.reason);
      }
    }
  };

  return (
    <>
      <Wrapper>
        {rates && captcha && (
          <>
            <Head>
              <title>Hire for Writing</title>
            </Head>

            <div>
              <section className="banner-section page-title">
                <div className="auto-container">
                  <div className="content">
                    <div className="text">Welcome to Type-IIx's</div>
                    <h1>Hire for Writing</h1>
                  </div>
                  <div className="breadcrumb-outer">
                    <ul className="page-breadcrumb">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>Hire for Writing</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="price-page-section">
                <div className="auto-container">
                  <div className="row clearfix">
                    <div className="price-block col-lg-5 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="title">Standard</div>
                        <div className="price">
                          <sup>{SYMBOLS[selectedCurrency]}</sup>
                          {prices.authorships}
                        </div>
                        <div className="date">per work of authorship</div>
                        <ul className="price-options">
                          <li>Attentive &amp; crafted solutions</li>
                          <li>Unlimited projects</li>
                          <li>Unlimited revision</li>
                          <li>Flexible timeline</li>
                          <li>Private consultation</li>
                        </ul>
                      </div>
                    </div>
                    <div className="price-block col-lg-7 col-md-6 col-sm-12">
                      <div className="inner-box">
                        <div className="contact-form">
                          <form method="post" action="#">
                            <p className="mb-2">
                              Fee Structure (in various currencies)
                            </p>
                            <div className="form-group">
                              <select
                                name="currency"
                                className="custom-select-box"
                                required
                                value={selectedCurrency}
                                onChange={handleCurrencyChange}
                              >
                                <option value={Currencies.USD}>
                                  US Dollar ($)
                                </option>
                                <option value={Currencies.CAD}>
                                  Canadian Dollar (C$)
                                </option>
                                <option value={Currencies.EUR}>Euro (€)</option>
                                <option value={Currencies.GBP}>
                                  Great British Sterling Pound (£)
                                </option>
                              </select>
                            </div>
                            <p className="mb-2">
                              To sign up to Hire for Writing, enter your email
                            </p>
                            <div className="form-group">
                              <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={formHandler}
                              />
                            </div>
                            <p className="mb-2">Website or Business name</p>
                            <div className="form-group">
                              <input
                                type="text"
                                name="website"
                                required
                                value={formData.website}
                                onChange={formHandler}
                              />
                            </div>
                            <p className="mb-2">Work of Authorship</p>
                            <div className="form-group">
                              <select
                                name="currency"
                                className="custom-select-box"
                                required
                                value={authorships}
                                onChange={handleAuthorShipsChange}
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                              </select>
                            </div>
                            <p className="mb-2">Intent of the writing(s)</p>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                ref={MarketingRef}
                              />
                              <label className="form-check-label">
                                Marketing
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                ref={EducationRef}
                              />
                              <label className="form-check-label">
                                Education
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                ref={ResearchRef}
                              />
                              <label className="form-check-label">
                                Research
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                ref={OpinionRef}
                              />
                              <label className="form-check-label">
                                Opinon/Editorial
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                ref={OthersRef}
                              />
                              <label className="form-check-label">Others</label>
                            </div>
                            <p className="mb-2">
                              Subject matter &amp; scope (topic of focus)
                            </p>
                            <div className="form-group">
                              <textarea
                                name="subject"
                                value={formData.subject}
                                onChange={formHandler}
                              />
                            </div>
                            <p className="mb-2">
                              Clickwrap agreement &amp; waiver
                            </p>
                            <div className="form-group">
                              <textarea
                                name="message"
                                defaultValue={others.authors}
                                ref={agreementRef}
                              />
                            </div>
                            <div className="form-group form-check mt-3">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                              />
                              <label className="form-check-label">
                                BY CLICKING THIS BUTTON, I AGREE TO TERMS &amp;
                                WILL TRANSMIT PAYMENT WITHIN 12 HOURS OF RECEIPT
                                OF EMAIL CONTAINING PAYMENT ADDRESS IF AUTHOR
                                ACCEPTS THE PROPOSAL” in the amount of:
                                <strong>
                                  {` ${SYMBOLS[selectedCurrency]}${prices.total}`}{" "}
                                  or {`${prices.bitcoinTotal}`} BTC (
                                  {formatMBTC(prices.bitcoinTotal)} mBTC)
                                </strong>
                              </label>
                            </div>
                            <small className="mb-2">
                              Note: Supplementary materials (media, e.g.,
                              documents, spreadsheets, presentations, graphics)
                              are to be collected as needed as work proceeds, if
                              the proposal is accepted. Communication will
                              follow by email to{" "}
                              {formData.email.length > 0
                                ? `(${formData.email})`
                                : ""}
                              , including notice of rejection with
                              modifications, or outright rejection, to proposal.
                            </small>

                            <div className="form-group">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: captcha.image,
                                }}
                              ></span>
                              <input
                                type="text"
                                name="captcha"
                                ref={captchaRef}
                              />
                            </div>
                            <div className="form-group col-lg-12 col-md-12 col-sm-12">
                              <button
                                className="theme-btn btn-style-three"
                                name="submit-form"
                                onClick={submitForm}
                              >
                                <span className="txt">Submit</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </Wrapper>
    </>
  );
}
