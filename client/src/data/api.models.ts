import { User, Account, Crypto } from "./models";

export type UserPromiseFunction = () => Promise<User>;

export type AccessAccountFunction = (account: Account) => Promise<string>;

export type GetCryptoFunction = (name?: string) => Promise<Crypto[]>;

export type UpdateCryptoFunction = (name?: string) => Promise<Crypto>;

export type ModifyCryptoFunction = (
  name: string,
  quantity: number
) => Promise<User>;

export type bookmarkCryptoFunction = (name: string) => Promise<User>;
