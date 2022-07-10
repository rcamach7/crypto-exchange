import { useContext, createContext, useState } from "react";
import { PopupBanner } from "../components/PopupBanner";
import { LoadingUx } from "../components/LoadingUx";
import {
  ContextInterface,
  BannerMessage,
  BannerMessageFunction,
  ContextProviderComponent,
} from "./context.models";

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
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showPopupBanner, setShowPopupBanner] = useState<BannerMessage>({
    show: false,
  });
  const [serverOffline, setServerOffline] = useState<boolean>(false);

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
        togglePageLoading,
        handleBannerMessage,
        setServerOffline,
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
          message={"Unable to connect to server - please try again later."}
          type={"error"}
        />
      )}
    </CryptoContext.Provider>
  );
};
