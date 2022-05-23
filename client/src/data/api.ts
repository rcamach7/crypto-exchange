import axios from "axios";
import { User, Account, Crypto } from "./models";
import config from "./config.json";

export const getUser: () => Promise<User> = async () => {
  try {
    const response = await axios.get(`${config.api}/user/`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createAccount: (account: Account) => Promise<string> = async (
  account
) => {
  try {
    const { data: token } = await axios.post(`${config.api}/user/`, {
      username: account.username,
      password: account.password,
    });

    return Promise.resolve(token.token);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login: (account: Account) => Promise<string> = async (account) => {
  try {
    const { data: token } = await axios.post(`${config.api}/login/`, {
      username: account.username,
      password: account.password,
    });
    return Promise.resolve(token.token);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCryptos: () => Promise<Crypto> = async () => {
  try {
    const response = await axios.get(`${config.api}/cryptos/`);

    return Promise.resolve(response.data.cryptos);
  } catch (error) {
    return Promise.reject(error);
  }
};
