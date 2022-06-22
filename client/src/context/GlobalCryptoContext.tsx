import { useContext, createContext, useState } from "react";
import { ConfirmationBanner } from "../components/ConfirmationBanner";
import { LoadingUx } from "../components/LoadingUx";
import {
  ContextInterface,
  BannerMessage,
  ConfirmationMessageFunction,
  ContextProviderComponent,
} from "./GlobalCryptoContext.models";
import { useAuthentication } from "../hooks/useAuthentication";
import { useFetchPosts } from "../hooks/useFetchPosts";

// Create context, and export custom hook that can extract our context values in different components.
const CryptoContext = createContext<ContextInterface | null>(null);
export const useGlobalContext = () => {
  const userContext = useContext(CryptoContext);

  if (!userContext) throw new Error("No user context found");

  return userContext;
};

// Define our context provider, and all then values it will provide.
export const GlobalCryptoProvider: ContextProviderComponent = ({
  children,
}) => {
  const [user, setUser, token, setToken] = useAuthentication();
  const [cryptos, setCryptos] = useFetchPosts();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showConfirmationBanner, setShowConfirmationBanner] =
    useState<BannerMessage>({ show: false });

  const togglePageLoading = () => setPageLoading((prevState) => !prevState);

  const handleConfirmationMessage: ConfirmationMessageFunction = (message) => {
    setShowConfirmationBanner({ show: true, message });

    setTimeout(function () {
      setShowConfirmationBanner({ show: false, message: "" });
    }, 5000);
  };

  return (
    <CryptoContext.Provider
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
      {/* Will populate all nested children components */}
      {children}
      {/* Used to overlay site with a loading UI, or a confirmation banner.*/}
      {pageLoading && <LoadingUx />}
      {showConfirmationBanner.show && (
        <ConfirmationBanner message={showConfirmationBanner.message} />
      )}
    </CryptoContext.Provider>
  );
};
