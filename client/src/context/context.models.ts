import { ReactNode } from "react";
import { Crypto, User } from "../data/global.models";

// Theme Context
export type ThemeProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export type PaletteMode = "light" | "dark";

// Global Context
export interface ContextInterface {
  cryptos: Crypto[];
  setCryptos: React.Dispatch<React.SetStateAction<Crypto[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  togglePageLoading: () => void;
  handleBannerMessage: (type: "success" | "error", message: string) => void;
}

export interface BannerMessage {
  type?: "success" | "error";
  show: boolean;
  message?: string;
}

export type BannerMessageFunction = (
  type: "success" | "error",
  message: string
) => void;

export type ContextProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;
