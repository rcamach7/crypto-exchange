import { useState, useEffect } from "react";
import { getCryptos } from "../data/api";
import { Crypto } from "../data/global.models";

export const useFetchPosts = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [serverOffline, setServerOffline] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const cryptos = await getCryptos();
        setCryptos(cryptos);
        setServerOffline(false);
      } catch (error) {
        setServerOffline(true);
      }
    };

    fetchPosts();
  }, []);

  return [cryptos, setCryptos, serverOffline] as const;
};
