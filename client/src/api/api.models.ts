import { User, Account, Crypto, NewsArticle } from "../global.models";

export type UserPromiseFunction = () => Promise<User>;

export type UpdateNameFunction = (name: string) => Promise<User>;

export type UpdateUserImageFunction = (
  profilePicture: File | null
) => Promise<User>;

export type AccessAccountFunction = (account: Account) => Promise<string>;

export type GetCryptoFunction = (name?: string) => Promise<Crypto[]>;

export type GetNewsArticlesFunction = () => Promise<NewsArticle[]>;

export type UpdateCryptoFunction = (name?: string) => Promise<Crypto>;

export type ModifyCryptoFunction = (
  name: string,
  quantity: number
) => Promise<User>;

export type bookmarkCryptoFunction = (name: string) => Promise<User>;
