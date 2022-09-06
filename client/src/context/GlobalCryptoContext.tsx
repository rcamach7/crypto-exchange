import { useContext, createContext, useState } from "react";
import { PopupBanner, LoadingUx } from "../components/";
import {
  ContextInterface,
  BannerMessage,
  BannerMessageFunction,
  ContextProviderComponent,
} from "./index";

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
  const [showPopupBanner, setShowPopupBanner] = useState<BannerMessage>({
    show: false,
  });

  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [serverOffline, setServerOffline] = useState<boolean>(false);

  const togglePageLoading = () => setPageLoading((prevState) => !prevState);

  // Will temporarily populate a custom banner message triggered by user actions within app.
  const handleBannerMessage: BannerMessageFunction = (type, message) => {
    setShowPopupBanner({ show: true, message, type });

    setTimeout(function () {
      setShowPopupBanner({ show: false, message: "" });
    }, 5000);
  };

  return (
    <CryptoContext.Provider
      value={{
        togglePageLoading,
        handleBannerMessage,
        setServerOffline,
      }}
    >
      {/* Will render all nested children components */}
      {children}

      {/* Used to overlay site with a loading UI, or a confirmation banner. Both components overlap all page.*/}
      {pageLoading && <LoadingUx />}
      {showPopupBanner.show && (
        <PopupBanner
          message={showPopupBanner.message}
          type={showPopupBanner.type}
        />
      )}
      {serverOffline && (
        <PopupBanner
          message={"Unable to connect to server - please try again later."}
          type="error"
        />
      )}
    </CryptoContext.Provider>
  );
};
