import { ThemeProvider as Provider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export type ThemeProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

export const ThemeProvider: ThemeProviderInterface = ({ children }) => {
  return <Provider theme={darkTheme}>{children}</Provider>;
};
