import Head from "next/head";
import Menu from "./components/menu";
import Footer from "./components/footer";

export default function Payment() {
  return (
    <>
      <Head>
        <title>Scan QR code for Payment</title>
      </Head>
      <Menu />
      <section className="banner-section page-title">
        <div className="auto-container">
          <div className="content">
            <h1>Payment</h1>
          </div>
          <div className="breadcrumb-outer">
            <ul className="page-breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/books">Books</a>
              </li>
              <li>
                <a href="/bookdetails">Book Name</a>
              </li>
              <li>
                <a href="/checkout">Checkout</a>
              </li>
              <li>Payment</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="course-detail-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 mx-auto">
              <div className="inner-column">
                <div class="course-tabs">
                  <div class="tabs-content">
                    <h4 className="mb-3 display-6 text-center">
                      Scan QR code for Payment
                    </h4>

                    <div className="qr">
                      <div className="row">
                        <div className="col-md-6 mx-auto">
                          <img src="/img/qr.png" className="img-fluid" />
                        </div>
                      </div>
                    </div>

                    <ul className="list-group my-2">
                      <li className="list-group-item d-flex justify-content-between">
                        <h5>Total (USD)</h5>
                        <strong>$20</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <h5>Total (BTC)</h5>
                        <strong>
                          0.013181 BTC <br /> (13.181 mBTC)
                        </strong>
                      </li>
                    </ul>

                    <button className="checkout-btn" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
