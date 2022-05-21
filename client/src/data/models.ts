export interface User {
  username: string;
  balance: number;
  portfolio: [{ crypto: string; quantity: number; principle: number }];
}
