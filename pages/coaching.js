import Head from "next/head";
import { useEffect, useState } from "react";
import { getRates } from "../utils/helpers";
import { Currencies } from "../constants/enums"

export default function Coaching() {

  const [isClient, setIsClient] = useState(false);
  const [rates, setRates] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(Currencies.USD)


  useEffect(() => {
    setIsClient(true);
  }, [])


  async function updateRates() {
    let d = await getRates();
    console.log("Updated Rates ", d)
    setRates(d);
  }

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  }

  return (<>
    {
      isClient && rates && <>
        <section className="banner-section page-title">
          <div className="auto-container">
            <div className="content">
              <div className="text">Welcome to our</div>
              <h1>Coaching</h1>
            </div>
            <div className="breadcrumb-outer">
              <ul className="page-breadcrumb">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Coaching</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="price-page-section">
          <div className="auto-container">
            <div className="row clearfix">
              <div className="price-block col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="title">Introductory</div>
                  <div className="price">
                    <sup>$</sup>250
                  </div>
                  <div className="date">For 1st month</div>
                  <ul className="price-options">
                    <li>
                      Unlimited questions pertaining to body composition,
                      hypertrophy, and performance
                    </li>
                    <li>
                      Training programs designed around supplements and goals
                    </li>
                    <li>
                      Nutrition planning assistance, including tailoring of
                      nutrient intakes, strategies and tactics
                    </li>
                    <li>Monitoring of body composition variables</li>
                    <li>
                      One biweekly, scheduled as needed, real-time chat via Matrix
                      federated chat (details on account creation will be provided
                      as needed) for 90 min each session
                    </li>
                  </ul>
                </div>
              </div>

              <div className="price-block col-lg-3 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="title">Standard</div>
                  <div className="price">
                    <sup>$</sup>350
                  </div>
                  <div className="date">Monthly</div>
                  <ul className="price-options">
                    <li>
                      Unlimited questions pertaining to body composition,
                      hypertrophy, and performance
                    </li>
                    <li>
                      Training programs designed around supplements and goals
                    </li>
                    <li>
                      Nutrition planning assistance, including tailoring of
                      nutrient intakes, strategies and tactics
                    </li>
                    <li>Monitoring of body composition variables</li>
                    <li>
                      One biweekly, scheduled as needed, real-time chat via Matrix
                      federated chat (details on account creation will be provided
                      as needed) for 90 min each session
                    </li>
                  </ul>
                </div>
              </div>

              <div className="price-block col-lg-6 col-md-6 col-sm-12">
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
                          <option value={Currencies.USD}>US Dollar ($)</option>
                          <option value={Currencies.CAD}>Canadian Dollar (C$)</option>
                          <option value={Currencies.EUR}>Euro (€)</option>
                          <option value={Currencies.GBP}>Great British Sterling Pound (£)</option>
                        </select>
                      </div>

                      <p className="mb-2">
                        To sign up for Coaching, enter your email
                      </p>
                      <div className="form-group">
                        <input type="email" name="email" required />
                      </div>

                      <p className="mb-2">Duration (in months)</p>
                      <div className="form-group">
                        <select
                          name="currency"
                          className="custom-select-box"
                          required
                          defaultValue={"2"}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                          <option>10</option>
                          <option>11</option>
                          <option>12</option>
                        </select>
                      </div>


                      <small className="form-text text-muted">
                        Planning proceeds in blocks ('mesocycles') of 3 or 4
                        months, so it is suggested that you commit to no less than
                        3 months at a time to achieve your objective (e.g.,
                        bulking, cutting, recomping)
                      </small>

                      <p className="mb-2">From Forum</p>
                      <div className="form-group">
                        <select name="currency" className="custom-select-box">
                          <option>Bodybuilding.com</option>
                          <option>T-Nation.com</option>
                        </select>
                      </div>

                      <p className="mb-2">Board Username</p>
                      <div className="form-group">
                        <input type="text" name="username" />
                      </div>




                      <p className="mb-2">Referal Code</p>
                      <div className="form-group">
                        <input type="text" name="referal" />
                      </div>

                      <p className="mb-2">Clickwrap agreement & waiver</p>
                      <div className="form-group">
                        <textarea name="message"></textarea>
                      </div>
                      <small className="form-text text-muted">
                        Agreement to Transmit Bitcoin (BTC): Coach will e-mail, to
                        your provided e-mail address ([user's email]), the BTC
                        address for payment, after you have read and agreed to the
                        following terms
                      </small>

                      <div className="form-group form-check mt-3">
                        <input type="checkbox" className="form-check-input" />
                        <label className="form-check-label">
                          BY CLICKING THIS BUTTON, I AGREE TO TERMS &amp; WILL
                          TRANSMIT PAYMENT WITHIN 12 HOURS OF RECEIPT OF EMAIL
                          CONTAINING PAYMENT ADDRESS in the amount of:{" "}
                          <strong>$250 USD or 0.00000001BTC</strong>
                        </label>
                      </div>

                      <div className="form-group col-lg-12 col-md-12 col-sm-12">
                        <button
                          className="theme-btn btn-style-three"
                          type="submit"
                          name="submit-form"
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
      </>
    }
  </>


  );
}




