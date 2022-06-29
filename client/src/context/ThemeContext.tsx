import { useContext, createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as Provider, createTheme } from "@mui/material/styles";
import { ThemeProviderInterface, PaletteMode } from "./context.models";

const SiteThemeContext = createContext({ toggleSiteTheme: () => {} });
export const useThemeContext = () => {
  const themeContext = useContext(SiteThemeContext);

  if (!themeContext) throw new Error("No user context found");

  return themeContext;
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
          background: {
            default: "#010101",
          },
          text: {
            primary: "#ffffff",
            secondary: "#ffffff",
          },
        }),
  },
});

export const ThemeContext: ThemeProviderInterface = ({ children }) => {
  const determineTheme = () => {
    let savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    } else {
      localStorage.setItem("theme", "light");
      return "light";
    }
  };

  const [mode, setMode] = useState<PaletteMode>(determineTheme());
  const setTheme = useMemo(
    () => ({
      toggleSiteTheme: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <SiteThemeContext.Provider value={setTheme}>
      <Provider theme={theme}>{children}</Provider>
    </SiteThemeContext.Provider>
  );
};
