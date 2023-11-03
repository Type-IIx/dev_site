import Head from "next/head";

export default function Consultancy() {
  return (
    <>
      <Head>
        <title>Consultancy</title>
      </Head>
      <section className="banner-section page-title">
        <div className="auto-container">
          <div className="content">
            <div className="text">Welcome to our</div>
            <h1>Consultancy</h1>
          </div>
          <div className="breadcrumb-outer">
            <ul className="page-breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Consultancy</li>
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
                  <sup>$</sup>100
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
                      >
                        <option>US Dollar ($)</option>
                        <option>Canadian Dollar (C$)</option>
                        <option>Euro (€)</option>
                        <option>Great British Sterling Pound (£)</option>
                      </select>
                    </div>

                    <p className="mb-2">
                      To sign up for Consultancy, enter your email
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
                      >
                        <option>1</option>
                        <option>2</option>
                        <option selected>3</option>
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
  );
}
