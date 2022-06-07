export interface User {
  username: string;
  balance: number;
  deposits: [{ date: Date; amount: number }];
  portfolio: [{ crypto: string; quantity: number; principle: number }];
  fullName: string;
  profilePicture: string;
}

export interface ContextInterface {
  cryptos: Crypto[];
  setCryptos: React.Dispatch<React.SetStateAction<Crypto[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  togglePageLoading: () => void;
  handleConfirmationMessage: (message: string) => void;
}

export interface SubmissionError {
  error?: any;
  helperText?: string;
}

export interface Account {
  username: string;
  password: string;
  fullName?: string;
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

export interface Error {
  exists: Boolean;
  message?: String;
}

export interface BannerMessage {
  show: boolean;
  message?: string;
}
