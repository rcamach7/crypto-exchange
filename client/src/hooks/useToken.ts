import { useState, useEffect } from "react";
import axios from "axios";

export const useToken = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

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

  return [token, setToken] as const;
};
