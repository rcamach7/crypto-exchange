import { useContext, createContext, ReactNode, useMemo, useState } from "react";
import { ThemeProvider as Provider, createTheme } from "@mui/material/styles";

// function MyApp() {
//   const theme = useTheme();
//   const SiteTheme = React.useContext(SiteThemeContext);
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         width: "100%",
//         alignItems: "center",
//         justifyContent: "center",
//         bgcolor: "background.default",
//         color: "text.primary",
//         borderRadius: 1,
//         p: 3,
//       }}
//     >
//       {theme.palette.mode} mode
//       <IconButton
//         sx={{ ml: 1 }}
//         onClick={SiteTheme.toggleSiteTheme}
//         color="inherit"
//       >
//         {theme.palette.mode === "dark" ? (
//           <Brightness7Icon />
//         ) : (
//           <Brightness4Icon />
//         )}
//       </IconButton>
//     </Box>
//   );
// }

export type ThemeProviderInterface = ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element;

const SiteThemeContext = createContext({ toggleSiteTheme: () => {} });
export const useThemeContext = () => {
  const themeContext = useContext(SiteThemeContext);

  if (!themeContext) throw new Error("No user context found");

  return themeContext;
};

export const ThemeContext: ThemeProviderInterface = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const setTheme = useMemo(
    () => ({
      toggleSiteTheme: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <SiteThemeContext.Provider value={setTheme}>
      <Provider theme={theme}>{children}</Provider>
    </SiteThemeContext.Provider>
  );
};
