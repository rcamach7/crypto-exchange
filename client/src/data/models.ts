export interface User {
  username: string;
  balance: number;
  portfolio: [{ crypto: string; quantity: number; principle: number }];
}

export interface ContextInterface {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface SubmissionError {
  error?: any;
  helperText?: string;
}

export interface Account {
  username: string;
  password: string;
  confirmedPassword?: string;
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

export interface CryptoWrapper {
  itemList: Crypto[];
}
