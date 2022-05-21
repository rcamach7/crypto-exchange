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
