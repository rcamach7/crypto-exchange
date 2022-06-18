import React from "react";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Login } from "./routes/Login";
import { OnlyUnauthenticated } from "./components/ProtectedRouting";
import { useAuthentication } from "./hooks/useAuthentication";
import { Home } from "./routes/Home";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useFetchPosts } from "./hooks/useFetchPosts";
import { Navbar } from "./components/Navbar/Navbar";
import { LoadingUx } from "./components/LoadingUx";
import { BannerMessage } from "./data/models";
import { ConfirmationBanner } from "./components/ConfirmationBanner";
import { Welcome } from "./routes/Welcome";

export const RouteSwitch = () => {
  const [user, setUser, token, setToken] = useAuthentication();
  const [cryptos, setCryptos] = useFetchPosts();
  const [pageLoading, setPageLoading] = React.useState<boolean>(false);
  const [showConfirmationBanner, setShowConfirmationBanner] =
    React.useState<BannerMessage>({ show: false });

  const togglePageLoading = () => setPageLoading((prevState) => !prevState);

  const handleConfirmationMessage: (message: string) => void = (message) => {
    setShowConfirmationBanner({ show: true, message: message });

    setTimeout(function () {
      setShowConfirmationBanner({ show: false, message: "" });
    }, 5000);
  };

  return (
    <HashRouter>
      <GlobalContext.Provider
        value={{
          user,
          setUser,
          cryptos,
          setCryptos,
          token,
          setToken,
          togglePageLoading,
          handleConfirmationMessage,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/crypto-exchange/" element={<Welcome />} />
          <Route path="/crypto-exchange/home" element={<Home />} />
          <Route
            path="/crypto-exchange/login"
            element={
              // Only users who are not yet authenticated can visit this page.
              <OnlyUnauthenticated token={token}>
                <Login />
              </OnlyUnauthenticated>
            }
          />
          <Route path="*" element={<Navigate to="/crypto-exchange/" />} />
        </Routes>

        {pageLoading ? <LoadingUx /> : null}
        {showConfirmationBanner.show ? (
          <ConfirmationBanner message={showConfirmationBanner.message} />
        ) : null}
      </GlobalContext.Provider>
    </HashRouter>
  );
};
