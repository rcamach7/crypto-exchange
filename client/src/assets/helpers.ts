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

export const formatPrice: (value: number) => number = (value) => {
  return Number.parseFloat((Math.round(value * 1000) / 1000).toFixed(3));
};

export const capitalizeFirstLetter: (word: string) => string = (word) => {
  return word.substring(0, 1).toUpperCase() + word.substring(1);
};

export const sortByPriceAscending: (cryptos: Crypto[]) => Crypto[] = (
  cryptos
) => {
  const sortedByPrice = [...cryptos];
  sortedByPrice.sort((a, b) => {
    if (a.price < b.price) {
      return -1;
    } else if (a.price > b.price) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedByPrice;
};

export const sortByPriceDescending: (cryptos: Crypto[]) => Crypto[] = (
  cryptos
) => {
  const sortedByPrice = [...cryptos];
  sortedByPrice.sort((a, b) => {
    if (a.price < b.price) {
      return 1;
    } else if (a.price > b.price) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortedByPrice;
};

export const calculatePortfolioValue: (
  portfolio: [{ crypto: string; quantity: number; principle: number }],
  cryptos: Crypto[]
) => number = (portfolio, cryptos) => {
  let totalValue = 0;

  portfolio.forEach((investment) => {
    cryptos.forEach((crypto) => {
      if (investment.crypto === crypto.name) {
        totalValue += crypto.price * investment.quantity;
      }
    });
  });

  return formatPrice(totalValue);
};

export const calculateTotalValue: (
  portfolio: [{ crypto: string; quantity: number; principle: number }],
  cryptos: Crypto[],
  balance: number
) => number = (portfolio, cryptos, balance) => {
  let portfolioValue = calculatePortfolioValue(portfolio, cryptos);

  return formatPrice(portfolioValue + balance);
};

export const calculateTotalInvestmentReturn: (
  accountValue: number,
  deposits: [{ date: Date; amount: number }]
) => string = (accountValue, deposits) => {
  let totalDepositValue = 0;
  deposits.forEach((deposit) => {
    totalDepositValue += deposit.amount;
  });

  let accountReturn =
    (100 * (accountValue - totalDepositValue)) / totalDepositValue;

  return `${accountReturn}%`;
};
