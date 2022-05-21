import { createContext, useContext } from "react";
import { ContextInterface } from "../data/models";

export const UserContext = createContext<ContextInterface | null>(null);

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) throw new Error("No user context found");

  return userContext;
};
