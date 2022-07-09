import { useEffect } from "react";
import { getCryptos } from "../data/api";
import { Crypto } from "../data/global.models";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setCryptos } from "../features/cryptos/cryptosSlice";

export const useFetchCryptos = () => {
  const dispatch = useAppDispatch();
  const cryptos = useAppSelector((state) => state.cryptos.value);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const cryptos: Crypto[] = await getCryptos();
        dispatch(setCryptos(cryptos));
      } catch (error) {
        console.log(error);
      }
    };

    if (!cryptos.length) {
      fetchPosts();
    }
  }, [cryptos, dispatch]);
};
