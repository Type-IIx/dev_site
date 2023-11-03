import Head from "next/head";

export default function Authors() {
  return (
    <>
      <Head>
        <title>Hire for writings</title>
      </Head>

      <section class="banner-section page-title">
        <div class="auto-container">
          <div class="content">
            <div class="text">Welcome to our</div>
            <h1>Hire for Writing</h1>
          </div>
          <div class="breadcrumb-outer">
            <ul class="page-breadcrumb">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Hire for Writing</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="price-page-section">
        <div class="auto-container">
          <div class="row clearfix">
            <div class="price-block col-lg-5 col-md-6 col-sm-12">
              <div class="inner-box">
                <div class="title">Standard</div>
                <div class="price">
                  <sup>$</sup>300
                </div>
                <div class="date">per work of authorship</div>
                <ul class="price-options">
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

            <div class="price-block col-lg-7 col-md-6 col-sm-12">
              <div class="inner-box">
                <div class="contact-form">
                  <form method="post" action="#">
                    <p class="mb-2">Fee Structure (in various currencies)</p>
                    <div class="form-group">
                      <select
                        name="currency"
                        class="custom-select-box"
                        required
                      >
                        <option>US Dollar ($)</option>
                        <option>Canadian Dollar (C$)</option>
                        <option>Euro (€)</option>
                        <option>Great British Sterling Pound (£)</option>
                      </select>
                    </div>

                    <p class="mb-2">
                      To sign up for Hire for Writing, enter your email
                    </p>
                    <div class="form-group">
                      <input type="email" name="email" required />
                    </div>

                    <p class="mb-2">Website or Business name</p>
                    <div class="form-group">
                      <input type="text" name="website" required />
                    </div>

                    <p class="mb-2">Work of Authorship</p>
                    <div class="form-group">
                      <select
                        name="currency"
                        class="custom-select-box"
                        required
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>

                    <p class="mb-2">Intent of the writing(s)</p>
                    <div class="form-group form-check-inline">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">Marketing</label>
                    </div>
                    <div class="form-group form-check-inline">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">Education</label>
                    </div>
                    <div class="form-group form-check-inline">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">Research</label>
                    </div>
                    <div class="form-group form-check-inline">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">Opinon/Editorial</label>
                    </div>
                    <div class="form-group form-check-inline">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">Others</label>
                    </div>

                    <p class="mb-2">Subject matter & scope (topic of focus)</p>
                    <div class="form-group">
                      <textarea name="message"></textarea>
                    </div>

                    <p class="mb-2">Clickwrap agreement & waiver</p>
                    <div class="form-group">
                      <textarea name="message"></textarea>
                    </div>

                    <div class="form-group form-check mt-3">
                      <input type="checkbox" class="form-check-input" />
                      <label class="form-check-label">
                        BY CLICKING THIS BUTTON, I AGREE TO TERMS & WILL
                        TRANSMIT PAYMENT WITHIN 12 HOURS OF RECEIPT OF EMAIL
                        CONTAINING PAYMENT ADDRESS IF AUTHOR ACCEPTS THE
                        PROPOSAL” in the amount of:{" "}
                        <strong>$250 USD or 0.00000001BTC</strong>
                      </label>
                    </div>

                    <small class="mb-2">
                      Note: Supplementary materials (media, e.g., documents,
                      spreadsheets, presentations, graphics) are to be collected
                      as needed as work proceeds, if the proposal is accepted.
                      Communication will follow by email to [user-email],
                      including notice of rejection with modifications, or
                      outright rejection, to proposal.
                    </small>

                    <div class="form-group col-lg-12 col-md-12 col-sm-12">
                      <button
                        class="theme-btn btn-style-three"
                        type="submit"
                        name="submit-form"
                      >
                        <span class="txt">Submit</span>
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
