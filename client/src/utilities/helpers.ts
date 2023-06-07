import { Crypto } from "../global.models";
import {
  GetCrypto,
  NumberWithCommas,
  FormatPrice,
  CapitalizeFirstLetter,
  SortFunction,
  FilterByOwned,
  FilterByBookmarked,
  ProcessFilterSortOptions,
  ReplaceUpdatedCrypto,
  CalculatePortfolioValue,
  CalculateTotalValue,
  CalculateTotalInvestmentReturn,
  CalculateAveragePurchasePrice,
  GetUserQuantityOwned,
} from "./helpers.models";

/**
 *  Miscellaneous helper functions
 */

export const getCrypto: GetCrypto = (cryptos, name) => {
  const indexOfCrypto: number = cryptos
    .map((crypto) => crypto.name)
    .indexOf(name);

  return cryptos[indexOfCrypto];
};

export const numberWithCommas: NumberWithCommas = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const formatPrice: FormatPrice = (value, decimalPlaces) => {
  if (value < 0.0001) {
    decimalPlaces = 7;
  }
  return Number.parseFloat(value.toFixed(decimalPlaces ? decimalPlaces : 3));
};

export const capitalizeFirstLetter: CapitalizeFirstLetter = (word) => {
  let capitalized = "";
  const words = word.split(" ");
  words.forEach((singleWord, i) => {
    if (i > 0) {
      capitalized += " ";
    }
    capitalized +=
      singleWord.substring(0, 1).toUpperCase() + singleWord.substring(1);
  });

  return capitalized;
};

/**
 * SORTING and FILTERING HELPER FUNCTIONS
 */
export const sortByPriceAscending: SortFunction = (cryptos) => {
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

export const sortByPriceDescending: SortFunction = (cryptos) => {
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

export const filterByOwned: FilterByOwned = (cryptos, owned) => {
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

export const filterByBookmarked: FilterByBookmarked = (cryptos, bookmarks) => {
  // Get collection of just the names to simplify operations later.
  const bookmarkedNames = bookmarks.map(({ name }) => name);

  const result = cryptos.filter((curCrypto) => {
    // We assume we don't own it, unless proven otherwise by the check below.
    let currentlyBookmarked = false;
    bookmarkedNames.forEach((name) => {
      if (name === curCrypto.name) {
        currentlyBookmarked = true;
      }
    });
    // True = keep, false = filter out.
    return currentlyBookmarked;
  });

  return result;
};

export const processFilterSortOptions: ProcessFilterSortOptions = (
  cryptos,
  settings,
  owned,
  bookmarks
) => {
  let result: Crypto[] = [...cryptos];

  // First Apply Filter
  switch (settings.filter) {
    case "owned":
      result = filterByOwned(cryptos, owned);
      break;
    case "bookmarked":
      result = filterByBookmarked(cryptos, bookmarks);
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

export const replaceUpdatedCrypto: ReplaceUpdatedCrypto = (cryptos, crypto) => {
  const cryptosCopy = [...cryptos];
  let indexOfOldCrypto = -1;

  cryptosCopy.forEach((curCrypto, i) => {
    if (curCrypto.name === crypto.name) {
      indexOfOldCrypto = i;
    }
  });
  if (indexOfOldCrypto > -1) {
    cryptosCopy[indexOfOldCrypto] = crypto;
  }

  return cryptosCopy;
};

/**
 *  CRYPTO PORTFOLIO CALCULATIONS
 */

export const calculatePortfolioValue: CalculatePortfolioValue = (
  portfolio,
  cryptos
) => {
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

export const calculateTotalValue: CalculateTotalValue = (
  portfolio,
  cryptos,
  balance
) => {
  let portfolioValue = calculatePortfolioValue(portfolio, cryptos);

  return formatPrice(portfolioValue + balance);
};

export const calculateTotalInvestmentReturn: CalculateTotalInvestmentReturn = (
  accountValue,
  deposits
) => {
  let totalDepositValue = 0;
  deposits.forEach((deposit) => {
    totalDepositValue += deposit.amount;
  });

  let accountReturn =
    (100 * (accountValue - totalDepositValue)) / totalDepositValue;

  return formatPrice(accountReturn);
};

export const calculateAveragePurchasePrice: CalculateAveragePurchasePrice = (
  transactions
) => {
  let totalPrice = 0;
  let totalQuantity = 0;

  transactions.forEach((transaction) => {
    totalPrice += transaction.purchasePrice * transaction.quantity;
    totalQuantity += transaction.quantity;
  });
  // Will reduce these two fields to total amount invested / spend, divided by the total amount of coins bought
  return totalPrice / totalQuantity;
};

/**
 *  Miscellaneous helper functions
 */

export const determineThemeBackground = (mode: "light" | "dark") => {
  return mode === "light" ? "white" : "black";
};

export const getUserQuantityOwned: GetUserQuantityOwned = (
  portfolio,
  cryptoName
) => {
  let quantity = 0;
  portfolio.forEach((investment) => {
    if (investment.crypto === cryptoName) {
      quantity = investment.quantity;
    }
  });
  return quantity;
};

export function roundToDecimals(num: number, decimalPlaces: number): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((num + Number.EPSILON) * factor) / factor;
}
