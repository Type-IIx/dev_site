import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  convertFromUSD,
  formatAndShowErrors,
  formatMBTC,
  getRates,
} from "../utils/helpers";
import { Currencies } from "../constants/enums";
import { CONSULTANCY, SYMBOLS } from "../constants/prices";
import { CoachingForm } from "../parsers/schema";
import { toast } from "react-toastify";
import Wrapper from "../components/Wrapper";
import { BASE_URL, path_ } from "../constants/apiInfo";
import axios from "axios";

export default function Consultancy() {
  const [rates, setRates] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(Currencies.USD);
  const [months, setMonths] = useState(1);
  const [checked, setChecked] = useState(false);
  const [prices, setPrices] = useState({
    consultancy: CONSULTANCY,
    total: CONSULTANCY,
    bitcoinTotal: 0,
  });

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    referal: "",
  });

  const agreementRef = useRef();
  const forumRef = useRef();

  const [others, setOthers] = useState({
    call: "",
    coaching: "",
    authors: "",
    consultancy: ""
  });
  const [forums, setForums] = useState([]);
  const [showUsername ,setShowUsername] = useState(false);
  const [captcha,setCaptcha] = useState(null)
  const captchaRef = useRef();
  

  const fetchCaptcha = async () => {
    const resp = await axios.get(BASE_URL + "captcha/generate");
    if (resp.status === 200){
      const result = await resp.data;
      setCaptcha(result);
    }
  }

  const fetchOthers = async () => {
    const resp = await axios.get(BASE_URL + path_ + "other");

    if (resp.status === 200) {
      const result = await resp.data;
      setOthers(result);
    }
  }

  const fetchForums = async () => {
    const resp = await axios.get(BASE_URL + path_ + "forum");
    if (resp.status === 200) {
      const result = await resp.data;
      setForums(result);
    }
  };

  // handlers here

  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  const handleMonthsChange = (e) => {
    try {
      if (Number(e.target.value) >= 1 && Number(e.target.value) <= 12) {
        setMonths(Number(e.target.value));
      }
    } catch { }
  };

  async function updateRates() {
    let d = await getRates();
    setRates(d);
  }

  // effects here

  useEffect(() => {
    fetchForums();
    fetchOthers();
    fetchCaptcha();
  }, [])

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (rates) {
      updatePrices();
    }
  }, [selectedCurrency, rates, months]);

  const updatePrices = () => {
    let temp = { ...prices };
    temp.consultancy = convertFromUSD(rates, CONSULTANCY, selectedCurrency);
    let newTotal = CONSULTANCY * months;
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
      username: "",
      referal: "",
    });
    setSelectedCurrency(Currencies.USD);
    setMonths(1);
    fetchCaptcha();
    forumRef.current.value = "";
    captchaRef.current.value = "";
  }

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (checked) {
        const result = CoachingForm.safeParse(formData);
        if (!result.success) {
          const errors = result.error.issues;
          console.log(errors);
          formatAndShowErrors(toast, errors);
        } else {
          const body = {
            ...formData,
            agreement: agreementRef.current.value,
            forum: forumRef.current.value,
            duration: months,
            fee_string: `${SYMBOLS[selectedCurrency]} ${prices.total}`
          }
          const finalBody = {
            captcha : {
              id : captcha.capId,
              answer : captchaRef.current.value
            },
            body
          }
          const url = BASE_URL + "submissions/consultancy/create"
          const res = await axios.post(url, finalBody);
          if (res) {
            toast.success("Success");
            clearForm();
          } else {
            toast.error("Failed Saving submission")
          }
        }
      } else {
        toast.error("Agree to terms");
      }
    } catch (e) {
      const data = await e.response.data;
      console.log(data);
      if (data && data.reason){
        toast.error(data.reason)
      }
    }
  };

  return (
    <>
      <Wrapper>
        {rates && captcha && (
          <>
            <Head>
              <title>Consultancy</title>
            </Head>
            <section className="banner-section page-title">
              <div className="auto-container">
                <div className="content">
                  <div className="text">Welcome to Type-IIx's</div>
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
                        <sup>{SYMBOLS[selectedCurrency]}</sup>
                        {prices.consultancy}
                      </div>
                      <div className="date">Monthly</div>
                      <ul className="price-options">
                        <li>
                          Unlimited questions pertaining to body composition,
                          hypertrophy, and performance
                        </li>
                        <li>
                          Individually tailored protocols oriented to either bulking, cutting, or recomping
                        </li>
                        <li>
                         Bloodwork monitoring to support physique enhancement
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
                            To sign up for Consultancy, enter your email
                          </p>
                          <div className="form-group">
                            <input
                              type="text"
                              name="email"
                              value={formData.email}
                              onChange={formHandler}
                              required
                            />
                          </div>

                          <p className="mb-2">Duration (in months)</p>
                          <div className="form-group">
                            <select
                              name="currency"
                              className="custom-select-box"
                              required
                              value={months}
                              onChange={handleMonthsChange}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                              <option value={5}>5</option>
                              <option value={6}>6</option>
                              <option value={7}>7</option>
                              <option value={8}>8</option>
                              <option value={9}>9</option>
                              <option value={10}>10</option>
                              <option value={11}>11</option>
                              <option value={12}>12</option>
                            </select>
                          </div>

                          <small className="form-text text-muted">
                            Planning proceeds in blocks ('mesocycles') of 3 or 4
                            months, so it is suggested that you commit to no
                            less than 3 months at a time to achieve your
                            objective (e.g., bulking, cutting, recomping)
                          </small>

                          <p className="mb-2">From Forum</p>
                          <div className="form-group">
                          <select
                                name="currency"
                                className="custom-select-box"
                                ref={forumRef}
                                onChange={(e) => {
                                  if (e.target.value.length >  0){
                                    setShowUsername(true)
                                  }else{
                                    setShowUsername(false);
                                    let temp = {...formData}
                                    temp.username = "";
                                    setFormData(temp);
                                  }
                                }}
                              >
                                <option value={""}>No Forum</option>
                                {
                                  forums.map((e, i) => {
                                    return <option value={e.name} key={`forum-${i}`}>{e.name}</option>
                                  })
                                }

                              </select>
                          </div>

                          {
                              showUsername && <>
                                <p className="mb-2">Board Username</p>
                            <div className="form-group">
                              <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={formHandler}
                              />
                            </div>
                              </>
                            }

                          <p className="mb-2">Referal Code</p>
                          <div className="form-group">
                            <input
                              type="text"
                              name="referal"
                              value={formData.referal}
                              onChange={formHandler}
                            />
                          </div>

                          <p className="mb-2">Clickwrap agreement & waiver</p>
                          <div className="form-group">
                            <textarea name="message" defaultValue={others.consultancy} ref={agreementRef}></textarea>
                          </div>
                          <small className="form-text text-muted">
                            Agreement to Transmit Bitcoin (BTC): Coach will
                            e-mail, to your provided e-mail address {formData.email.length > 0 ? `(${formData.email})` : ""}, the BTC address for payment, after you have
                            read and agreed to the following terms
                          </small>

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
                              OF EMAIL CONTAINING PAYMENT ADDRESS in the amount
                              of:
                              <strong>
                                {`${SYMBOLS[selectedCurrency]} ${prices.total}`}
                                or {`${prices.bitcoinTotal}`} BTC (
                                {formatMBTC(prices.bitcoinTotal)} mBTC)
                              </strong>
                            </label>
                          </div>

                          <div className="form-group">
                            <span  dangerouslySetInnerHTML={{ __html: captcha.image }}>

</span>
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
          </>
        )}
      </Wrapper>
    </>
  );
}
