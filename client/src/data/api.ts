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
      fullName: account.fullName,
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

export const getCryptos: () => Promise<Crypto[]> = async () => {
  try {
    const response = await axios.get(`${config.api}/cryptos/`);

    return Promise.resolve(response.data.cryptos);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSingleCrypto: (name: string) => Promise<Crypto> = async (
  name: string
) => {
  try {
    const response = await axios.get(`${config.api}/cryptos/${name}`);
    return Promise.resolve(response.data.crypto);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const purchaseCrypto: (
  name: string,
  quantity: number
) => Promise<User> = async (name, quantity) => {
  try {
    const response = await axios.post(
      `${config.api}/transactions/buy/${name}&${quantity}`
    );

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sellCrypto: (
  name: string,
  quantity: number
) => Promise<User> = async (name, quantity) => {
  try {
    const response = await axios.post(
      `${config.api}/transactions/sell/${name}&${quantity}`
    );
    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const bookmarkCrypto: (name: string) => Promise<User> = async (name) => {
  try {
    const response = await axios.put(`${config.api}/user/bookmark/${name}`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
