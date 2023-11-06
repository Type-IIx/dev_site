import Head from "next/head";

import { useEffect, useState } from "react";
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

export default function Authors() {
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

  const submitForm = (e) => {
    try {
      e.preventDefault();
      if (checked) {
        const result = AuthorForm.safeParse(formData);
        if (!result.success) {
          const errors = result.error.issues;
          console.log(errors);
          formatAndShowErrors(toast, errors);
        } else {
          toast.success("Sending Email now");
        }
      } else {
        toast.error("Agree to terms");
      }
    } catch (e) {
      console.log(e);
      if (e.length && e.length > 0) {
        if (e[0].code) {
          console.log(e);
          console.log(e.message);
        }
      }
    }
  };

  return (
    <>
      <Wrapper>
        {rates && (
          <>
            <Head>
              <title>Hire for writings</title>
            </Head>

            <div>
              <section className="banner-section page-title">
                <div className="auto-container">
                  <div className="content">
                    <div className="text">Welcome to our</div>
                    <h1>Hire for Writing</h1>
                  </div>
                  <div className="breadcrumb-outer">
                    <ul className="page-breadcrumb">
                      <li>
                        <a href="index.html">Home</a>
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
                          <li>
                            Unlimited questions pertaining to body composition,
                            hypertrophy, and performance
                          </li>
                          <li>
                            Training programs designed around supplements and
                            goals
                          </li>
                          <li>
                            Nutrition planning assistance, including tailoring
                            of nutrient intakes, strategies and tactics
                          </li>
                          <li>Monitoring of body composition variables</li>
                          <li>
                            One biweekly, scheduled as needed, real-time chat
                            via Matrix federated chat (details on account
                            creation will be provided as needed) for 90 min each
                            session
                          </li>
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
                              To sign up for Hire for Writing, enter your email
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
                              />
                              <label className="form-check-label">
                                Marketing
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Education
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Research
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Opinon/Editorial
                              </label>
                            </div>
                            <div className="form-group form-check-inline">
                              <input
                                type="checkbox"
                                className="form-check-input"
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
                              <textarea name="message" defaultValue={""} />
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
                                  {`${SYMBOLS[selectedCurrency]} ${prices.total}`}
                                  or {`${prices.bitcoinTotal}`}BTC (
                                  {formatMBTC(prices.bitcoinTotal)} mBTC)
                                </strong>
                              </label>
                            </div>
                            <small className="mb-2">
                              Note: Supplementary materials (media, e.g.,
                              documents, spreadsheets, presentations, graphics)
                              are to be collected as needed as work proceeds, if
                              the proposal is accepted. Communication will
                              follow by email to [user-email], including notice
                              of rejection with modifications, or outright
                              rejection, to proposal.
                            </small>
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
