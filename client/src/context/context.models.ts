import { ReactNode } from "react";

// Theme Context
export type ThemeProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export type PaletteMode = "light" | "dark";

// Global Context
export enum ResponseType {
  Success = "success",
  Error = "error",
}

export interface ContextInterface {
  togglePageLoading: () => void;
  handleBannerMessage: (type: ResponseType, message: string) => void;
  setServerOffline: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BannerMessage {
  type?: ResponseType;
  show: boolean;
  message?: string;
}

export type BannerMessageFunction = (
  type: ResponseType,
  message: string
) => void;

export type ContextProviderComponent = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;
