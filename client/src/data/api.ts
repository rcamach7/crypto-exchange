import {
  UserPromiseFunction,
  AccessAccountFunction,
  UpdateCryptoFunction,
  ModifyCryptoFunction,
  bookmarkCryptoFunction,
  GetCryptoFunction,
  UpdateNameFunction,
  UpdateUserImageFunction,
} from "./api.models";
import axios from "axios";
import config from "./config.json";

export const getUser: UserPromiseFunction = async () => {
  try {
    const response = await axios.get(`${config.api}/user/`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateName: UpdateNameFunction = async (name) => {
  try {
    const response = await axios.put(`${config.api}/user/`, { fullName: name });

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
      url: `${config.api}/user/`,
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
    const { data: token } = await axios.post(`${config.api}/user/`, {
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
    const { data: token } = await axios.post(`${config.api}/login/`, {
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
    const response = await axios.get(`${config.api}/cryptos/`);

    return Promise.resolve(response.data.cryptos);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSingleCrypto: UpdateCryptoFunction = async (name) => {
  try {
    const response = await axios.get(`${config.api}/cryptos/${name}`);
    return Promise.resolve(response.data.crypto);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const purchaseCrypto: ModifyCryptoFunction = async (name, quantity) => {
  try {
    const response = await axios.post(
      `${config.api}/transactions/buy/${name}&${quantity}`
    );

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const sellCrypto: ModifyCryptoFunction = async (name, quantity) => {
  try {
    const response = await axios.post(
      `${config.api}/transactions/sell/${name}&${quantity}`
    );
    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const bookmarkCrypto: bookmarkCryptoFunction = async (name) => {
  try {
    const response = await axios.put(`${config.api}/user/bookmark/${name}`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
