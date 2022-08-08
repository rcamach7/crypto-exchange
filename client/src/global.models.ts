export interface User {
  username: string;
  balance: number;
  deposits: [{ date: Date; amount: number }];
  portfolio: [
    {
      crypto: string;
      quantity: number;
      principle: number;
      transactions: [{ quantity: number; purchasePrice: number }];
    }
  ];
  fullName: string;
  profilePicture: string;
  bookmarks: [];
}

export interface Crypto {
  name: string;
  ticker: string;
  image: string;
  price: number;
  lastUpdated: Date;
  marketHistory: {
    priceChangePercentage7d: number;
    priceChangePercentage24h: number;
    priceChangePercentage14d: number;
  };
}

export interface NewsArticle {
  title: string;
  link: string;
  creator: [];
  description: string;
  content: string;
  pubDate: Date;
  image_url: string;
  dateAdded: Date;
}

export interface Account {
  username: string;
  password: string;
  fullName?: string;
  confirmedPassword?: string;
}

export interface CryptoWrapper {
  itemList: Crypto[];
}

export enum FilterBy {
  None = "none",
  Owned = "owned",
  Bookmarked = "bookmarked",
}

export enum SortBy {
  Popular = "popular",
  PriceAscending = "price-ascending",
  PriceDescending = "price-descending",
}

export interface SortFilterOptions {
  sort: SortBy;
  filter: FilterBy;
}

// Error Handling
export interface Error {
  exists: Boolean;
  message?: String;
}

export interface SubmissionError {
  error?: any;
  helperText?: string;
}
