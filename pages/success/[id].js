import Head from "next/head";
import Wrapper from "../../components/Wrapper";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BASE_DOMAIN, BASE_URL } from "../../constants/apiInfo";
import axios from "axios";
import { toast } from "react-toastify";
import countryList from "react-select-country-list";
import { useCountries } from "use-react-countries";
import { CheckoutForm } from "../../parsers/schema";
import {
  convertFromUSD,
  formatAndShowErrors,
  formatMBTC,
  getRates,
} from "../../utils/helpers";

export default function Bookdetail() {
  const [bookId, setBookId] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [rates, setRates] = useState(false);

  const router = useRouter();

  const fetchOrder = async () => {
    const resp = await axios.get(BASE_URL + `checkout/${bookId}`);
    if (resp.status === 200) {
      const d = await resp.data;
      setOrder(d);
    } else {
      toast.error("failed fetching order");
    }
  };

  async function updateRates() {
    let d = await getRates();
    setRates(d);
  }

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setBookId(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (bookId !== -1) {
      fetchOrder();
    }
  }, [bookId]);

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <Head>
        <title>Scan QR code for Payment</title>
      </Head>
      <Wrapper>
        {bookId !== -1 && order && rates && (
          <>
            <>
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
                              Scan QR code for Payment (#{order.id})
                            </h4>

                            <div className="qr">
                              <div className="row">
                                <div className="col-md-6 mx-auto">
                                  <img
                                    src="/img/qr.png"
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                            </div>

                            <ul className="list-group my-2">
                              <li className="list-group-item d-flex justify-content-between">
                                <h5>Total (USD)</h5>
                                <strong>${order.total}</strong>
                              </li>
                              <li className="list-group-item d-flex justify-content-between">
                                <h5>Total (BTC)</h5>
                                <strong>
                                  {convertFromUSD(rates, order.total, -1)} BTC{" "}
                                  <br /> (
                                  {formatMBTC(
                                    convertFromUSD(rates, order.total, -1)
                                  )}{" "}
                                  mBTC)
                                </strong>
                              </li>
                            </ul>

                            {/* <button className="checkout-btn" type="submit">
                              Place Order
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
            {/* <section className="banner-section page-title">
							<div className="auto-container">
								<div className="content">
									<h1>Thank you for shopping</h1>
								</div>
								<div className="sec-title centered mt-5">
									<h3 className="">Order ID: #{bookId}</h3>
									<h4>Your Order has been placed successfully</h4>
								</div>
							</div>
						</section> */}
          </>
        )}
      </Wrapper>
    </>
  );
}
