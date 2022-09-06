import {
  UserPromiseFunction,
  AccessAccountFunction,
  UpdateCryptoFunction,
  ModifyCryptoFunction,
  bookmarkCryptoFunction,
  GetCryptoFunction,
  UpdateNameFunction,
  UpdateUserImageFunction,
  GetNewsArticlesFunction,
} from "./api.models";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const getUser: UserPromiseFunction = async () => {
  try {
    const response = await axios.get(`/user/`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateName: UpdateNameFunction = async (name) => {
  try {
    const response = await axios.put(`/user/`, { fullName: name });

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserImage: UpdateUserImageFunction = async (
  profilePicture
) => {
  if (!profilePicture) return Promise.reject("No image found");

  try {
    // Create a formData instance so we can send multipart/form-data outside of form control
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    const response = await axios({
      method: "put",
      url: `/user/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createAccount: AccessAccountFunction = async (account) => {
  try {
    const { data: token } = await axios.post(`/user/`, {
      fullName: account.fullName?.toLowerCase(),
      username: account.username.toLowerCase(),
      password: account.password,
    });

    return Promise.resolve(token.token);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login: AccessAccountFunction = async (account) => {
  try {
    const { data: token } = await axios.post(`/login/`, {
      username: account.username.toLowerCase(),
      password: account.password,
    });
    return Promise.resolve(token.token);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCryptos: GetCryptoFunction = async () => {
  try {
    const response = await axios.get(`/cryptos/`);

    return Promise.resolve(response.data.cryptos);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSingleCrypto: UpdateCryptoFunction = async (name) => {
  try {
    const response = await axios.get(`/cryptos/${name}`);
    return Promise.resolve(response.data.crypto);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const purchaseCrypto: ModifyCryptoFunction = async (name, quantity) => {
  try {
    const response = await axios.post(`/transactions/buy/${name}&${quantity}`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sellCrypto: ModifyCryptoFunction = async (name, quantity) => {
  try {
    const response = await axios.post(`/transactions/sell/${name}&${quantity}`);
    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const bookmarkCrypto: bookmarkCryptoFunction = async (name) => {
  try {
    const response = await axios.put(`/user/bookmark/${name}`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const getNewsArticles: GetNewsArticlesFunction = async () => {
  try {
    const response = await axios.get(`/news/`);

    return Promise.resolve(response.data.articles);
  } catch (error) {
    return Promise.reject(error);
  }
};
