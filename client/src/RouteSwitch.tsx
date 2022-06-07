import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { OpenRoute } from "./components/UserRouting";
import { useAuthentication } from "./hooks/useAuthentication";
import { Home } from "./routes/Home";
import { GlobalContext } from "./hooks/useGlobalContext";
import { useFetchPosts } from "./hooks/useFetchPosts";
import { Navbar } from "./components/Navbar/Navbar";
import { LoadingUx } from "./components/LoadingUx";
import { BannerMessage } from "./data/models";
import { ConfirmationBanner } from "./components/ConfirmationBanner";

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
    <BrowserRouter>
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
          <Route path="home" element={<Home />} />
          <Route
            path="login"
            element={
              // Only users who are not yet authenticated can visit this page.
              <OpenRoute token={token}>
                <LandingPage />
              </OpenRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>

        {pageLoading ? <LoadingUx /> : null}
        {showConfirmationBanner.show ? (
          <ConfirmationBanner message={showConfirmationBanner.message} />
        ) : null}
      </GlobalContext.Provider>
    </BrowserRouter>
  );
};
