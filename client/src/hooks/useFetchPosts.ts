import React from "react";
import { getCryptos } from "../data/api";
import { Crypto } from "../data/models";

export const useFetchPosts = () => {
  const [cryptos, setCryptos] = React.useState<Crypto[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const cryptos = await getCryptos();
        setCryptos(cryptos);
      } catch (error) {
        alert(
          "Error communicating with server! If error persists, please reach out to contact@ricardo-camacho.dev"
        );
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return [cryptos, setCryptos] as const;
};
