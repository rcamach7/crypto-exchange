import { useEffect } from "react";
import { getCryptos } from "../api/api";
import { Crypto } from "../global.models";
import { useAppDispatch, useAppSelector, setCryptos } from "../features/";
import { useGlobalContext } from "../context/GlobalCryptoContext";

export const useFetchCryptos = () => {
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector((state) => state.cryptos.value);

  // Will catch any errors communicating with server and let user know via a popup banner.
  const { setServerOffline } = useGlobalContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const cryptos: Crypto[] = await getCryptos();
        dispatch(setCryptos(cryptos));
        setServerOffline(false);
      } catch (error) {
        setServerOffline(true);
        console.log(error);
      }
    };

    if (!cryptos.length) {
      fetchPosts();
    }
  }, [cryptos, dispatch, setServerOffline]);
};
