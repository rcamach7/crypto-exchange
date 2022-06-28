import { useContext, createContext, useState } from "react";
import { PopupBanner } from "../components/PopupBanner";
import { LoadingUx } from "../components/LoadingUx";
import {
  ContextInterface,
  BannerMessage,
  BannerMessageFunction,
  ContextProviderComponent,
} from "./GlobalCryptoContext.models";
import { useUserAuth } from "../hooks/useUserAuth";
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
  const [user, setUser, token, setToken] = useUserAuth();
  const [cryptos, setCryptos, serverOffline] = useFetchPosts();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showPopupBanner, setShowPopupBanner] = useState<BannerMessage>({
    show: false,
  });

  const togglePageLoading = () => setPageLoading((prevState) => !prevState);

  const handleBannerMessage: BannerMessageFunction = (type, message) => {
    setShowPopupBanner({ show: true, message, type });

    setTimeout(function () {
      setShowPopupBanner({ show: false, message: "" });
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
        handleBannerMessage,
      }}
    >
      {/* Will populate all nested children components */}
      {children}
      {/* Used to overlay site with a loading UI, or a confirmation banner.*/}
      {pageLoading && <LoadingUx />}
      {showPopupBanner.show && (
        <PopupBanner
          message={showPopupBanner.message}
          type={showPopupBanner.type}
        />
      )}
      {serverOffline && (
        <PopupBanner
          message={"Unable to connect to server - try again later."}
          type={"error"}
        />
      )}
    </CryptoContext.Provider>
  );
};
