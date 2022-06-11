import { Crypto, SortFilterOptions } from "../data/models";

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

export const formatPrice: (value: number, decimalPlaces?: number) => number = (
  value,
  decimalPlaces
) => {
  return Number.parseFloat(
    (Math.round(value * 1000) / 1000).toFixed(decimalPlaces ? decimalPlaces : 3)
  );
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

export const filterByOwned: (
  cryptos: Crypto[],
  owned:
    | [
        {
          crypto: string;
          quantity: number;
          principle: number;
        }
      ]
    | []
) => Crypto[] = (cryptos, owned) => {
  // Get collection of just the names to simplify operations later.
  const ownedNames = owned.map(({ crypto }) => crypto);
  const result = cryptos.filter((curCrypto) => {
    // We assume we don't own it, unless proven otherwise by the check below.
    let currentlyOwned = false;
    ownedNames.forEach((name) => {
      if (name === curCrypto.name) {
        currentlyOwned = true;
      }
    });
    // True = keep, false = filter out.
    return currentlyOwned;
  });

  return result;
};

export const processFilterSortOptions: (
  cryptos: Crypto[],
  settings: SortFilterOptions,
  owned:
    | [
        {
          crypto: string;
          quantity: number;
          principle: number;
        }
      ]
    | []
) => Crypto[] = (cryptos, settings, owned) => {
  let result: Crypto[] = [...cryptos];

  // First Apply Filter
  switch (settings.filter) {
    case "owned":
      result = filterByOwned(cryptos, owned);
      break;
    case "bookmarked":
      break;
    default:
      break;
  }

  // Then Apply Sort
  switch (settings.sort) {
    case "price-ascending":
      result = sortByPriceAscending(result);
      break;
    case "price-descending":
      result = sortByPriceDescending(result);
      break;
    default:
      break;
  }

  return result;
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
  deposits: [{ date: Date; amount: number }] | []
) => number = (accountValue, deposits) => {
  let totalDepositValue = 0;
  deposits.forEach((deposit) => {
    totalDepositValue += deposit.amount;
  });

  let accountReturn =
    (100 * (accountValue - totalDepositValue)) / totalDepositValue;

  return formatPrice(accountReturn);
};

export const numberWithCommas: (number: number) => string = (number) => {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
