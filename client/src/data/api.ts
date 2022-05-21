import axios from "axios";
import { User } from "./models";
import config from "./config.json";

export const getUser: () => Promise<User> = async () => {
  try {
    const response = await axios.get(`${config.api}/user/`);

    return Promise.resolve(response.data.user);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login: () => Promise<string> = async () => {
  try {
    const { data: token } = await axios.get(`${config.api}/login/`);
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
};
