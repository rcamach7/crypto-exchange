import { useEffect } from "react";
import axios from "axios";
import { User } from "../global.models";
import { getUser } from "../api/api";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setUser, removeUser } from "../features/user/userSlice";
import { removeToken } from "../features/jwtToken/jwtTokenSlice";

export const useManageUser = () => {
  const token = useAppSelector((state) => state.jwtToken.value);
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  // Will update the token that's being sent as a header to validate user anytime its value changes.
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

  // Will fetch user anytime we hold a token but user hasn't been fetched.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user: User = await getUser();
        dispatch(setUser(user));
      } catch (error) {
        localStorage.removeItem("token");
        dispatch(removeToken());
        dispatch(removeUser());
      }
    };

    if (token && !user) {
      fetchData();
    }
  }, [token, user, dispatch]);
};
