import axios from "axios";
import bcrypt from "bcryptjs";

const LOCAL_API = "/api/";

export const getRates = async () => {
  let resp = await axios.get(LOCAL_API + "rates");
  let data = await resp.data;
  return data;
};

export const CustomRound = (num, decimals) => {
  return Math.round((num + Number.EPSILON) * 10 ** decimals) / 10 ** decimals;
};

export const convertFromUSD = (rates, amount, to) => {
  let rate = 0;
  let decimals = 2;
  switch (Number(to)) {
    case 0:
      rate = 1;
      break;
    case 2:
      rate = 1 / rates[1].price;
      break;
    case 1:
      rate = 1 / rates[2].price;
      break;
    case 3:
      rate = 1 / rates[0].price;
      break;
    case -1:
      rate = 1 / rates[3].price;
      decimals = 6;
      break;
  }
  return CustomRound(amount * rate, decimals);
};

export const formatAndShowErrors = (toast, errors) => {
  for (let err of errors) {
    toast.error(`${err.path[0]} : ${err.message}`);
  }
};

export const formatMBTC = (amount) => {
  return amount * 1000;
};

export const encryptPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};
