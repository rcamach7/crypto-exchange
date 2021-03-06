import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Login } from "./routes/Login";
import { OnlyUnauthenticated } from "./components/ProtectedRouting";
import { Home } from "./routes/Home";
import { Navbar } from "./components/Navbar/Navbar";
import { Welcome } from "./routes/Welcome";
import { ThemeContext } from "./context/ThemeContext";
import { News } from "./routes/News";
import { useFetchNewsArticles } from "./hooks/useFetchNewsArticles";
import { useFetchCryptos } from "./hooks/useFetchCryptos";
import { useManageUser } from "./hooks/useManageUser";

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
