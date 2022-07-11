import { Crypto, SortFilterOptions } from "../global.models";

export type GetCrypto = (cryptos: Crypto[], name: string) => Crypto;

export type NumberWithCommas = (number: number) => string;

export type FormatPrice = (value: number, decimalPlaces?: number) => number;

export type CapitalizeFirstLetter = (word: string) => string;

export type SortFunction = (cryptos: Crypto[]) => Crypto[];

export type FilterByOwned = (
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
) => Crypto[];

export type FilterByBookmarked = (
  cryptos: Crypto[],
  bookmarks:
    | [
        {
          name: string;
        }
      ]
    | []
) => Crypto[];

export type ProcessFilterSortOptions = (
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
    | [],
  bookmarks: [{ name: string }] | []
) => Crypto[];

export type ReplaceUpdatedCrypto = (
  cryptos: Crypto[],
  crypto: Crypto
) => Crypto[];

export type CalculatePortfolioValue = (
  portfolio: [{ crypto: string; quantity: number; principle: number }],
  cryptos: Crypto[]
) => number;

export type CalculateTotalValue = (
  portfolio: [{ crypto: string; quantity: number; principle: number }],
  cryptos: Crypto[],
  balance: number
) => number;

export type CalculateTotalInvestmentReturn = (
  accountValue: number,
  deposits: [{ date: Date; amount: number }] | []
) => number;

export type CalculateAveragePurchasePrice = (
  transactions: [{ quantity: number; purchasePrice: number }]
) => number;

export type GetUserQuantityOwned = (
  portfolio: [{ crypto: string; quantity: number; principle: number }] | [],
  cryptoName: string
) => number;
