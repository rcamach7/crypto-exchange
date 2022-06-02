import { createContext, useContext } from "react";
import { ContextInterface } from "../data/models";

export const GlobalContext = createContext<ContextInterface | null>(null);

export const useGlobalContext = () => {
  const userContext = useContext(GlobalContext);

  if (!userContext) throw new Error("No user context found");

  return userContext;
};
