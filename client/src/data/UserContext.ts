import { createContext } from "react";
import { ContextInterface } from "./models";

export const UserContext = createContext<ContextInterface | null>(null);
