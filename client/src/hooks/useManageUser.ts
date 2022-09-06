import { useEffect } from "react";
import axios from "axios";
import { User } from "../global.models";
import { getUser } from "../api/api";
import {
  useAppDispatch,
  useAppSelector,
  setUser,
  removeUser,
  removeToken,
} from "../features/";

export const useManageUser = () => {
  const token = useAppSelector((state) => state.jwtToken.value);
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  // Will update the token that's being sent as a header to validate user anytime its value changes.
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  // Will fetch user anytime we hold a token but user hasn't been fetched.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user: User = await getUser();
        dispatch(setUser(user));
      } catch (error) {
        // Will remove user and token due to expired token or error communicating with server.
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
