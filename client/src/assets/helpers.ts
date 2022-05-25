import { Crypto } from "../data/models";

// Will return a specific crypto when given a collection of cryptos and a name parameter
export const getCrypto: (cryptos: Crypto[], name: string) => Crypto = (
  cryptos,
  name
) => {
  const indexOfCrypto: number = cryptos
    .map((crypto) => crypto.name)
    .indexOf(name);

  return cryptos[indexOfCrypto];
};

export const formatPrice: (value: number | undefined) => string = (value) => {
  if (value === undefined) {
    return "undefined";
  }
  return (Math.round(value * 1000) / 1000).toFixed(3);
};
