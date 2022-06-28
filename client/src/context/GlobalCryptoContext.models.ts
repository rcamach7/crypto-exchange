import { Crypto, User } from "../data/global.models";
import { ReactNode } from "react";

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

export interface BannerMessage {
  show: boolean;
  message?: string;
}

export type ConfirmationMessageFunction = (message: string) => void;

export type ContextProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;
