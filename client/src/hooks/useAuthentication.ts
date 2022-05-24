import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../data/models";
import { getUser } from "../data/api";

export const useAuthentication = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  // Will update the token that's being sent as a header to validate user.
  useEffect(() => {
    axios.interceptors.request.use(
      (config: any) => {
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        // Token has expired
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    };

    if (token && !user) {
      fetchData();
    }
  }, [token, user]);

  return [user, setUser, token, setToken] as const;
};
