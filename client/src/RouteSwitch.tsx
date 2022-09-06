import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Home, Login, Welcome, News } from "./routes/";
import { OnlyUnauthenticated } from "./components/";
import { Navbar } from "./components/Navbar/";
import { ThemeContext } from "./context/";
import { useFetchNewsArticles, useFetchCryptos, useManageUser } from "./hooks/";

export const RouteSwitch = () => {
  // Hooks that will manage redux store values based on app changes.
  useFetchNewsArticles();
  useFetchCryptos();
  useManageUser();

  return (
    <ThemeContext>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/crypto-exchange/" element={<Welcome />} />
          <Route path="/crypto-exchange/home" element={<Home />} />
          <Route path="/crypto-exchange/news" element={<News />} />
          <Route
            path="/crypto-exchange/login"
            element={
              // Prevent users that are logged in to access this route.
              <OnlyUnauthenticated>
                <Login />
              </OnlyUnauthenticated>
            }
          />
          {/* Redirect all users navigating to invalid pages, back into our welcome page. */}
          <Route path="*" element={<Navigate to="/crypto-exchange/" />} />
        </Routes>
      </HashRouter>
    </ThemeContext>
  );
};
