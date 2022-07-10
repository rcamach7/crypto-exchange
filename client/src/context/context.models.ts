import { ReactNode } from "react";

// Theme Context
export type ThemeProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export type PaletteMode = "light" | "dark";

// Global Context
export interface ContextInterface {
  togglePageLoading: () => void;
  handleBannerMessage: (type: "success" | "error", message: string) => void;
  setServerOffline: React.Dispatch<React.SetStateAction<boolean>>;
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
