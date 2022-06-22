import { useContext, createContext, useState, ReactNode } from "react";
import { ConfirmationBanner } from "../components/ConfirmationBanner";
import { LoadingUx } from "../components/LoadingUx";
import { ContextInterface, BannerMessage } from "../data/models";
import { useAuthentication } from "../hooks/useAuthentication";
import { useFetchPosts } from "../hooks/useFetchPosts";

export const CryptoContext = createContext<ContextInterface | null>(null);
export const useGlobalContext = () => {
  const userContext = useContext(CryptoContext);

  if (!userContext) throw new Error("No user context found");

  return userContext;
};

export const GlobalCryptoProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser, token, setToken] = useAuthentication();
  const [cryptos, setCryptos] = useFetchPosts();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showConfirmationBanner, setShowConfirmationBanner] =
    useState<BannerMessage>({ show: false });

  const togglePageLoading = () => setPageLoading((prevState) => !prevState);

  const handleConfirmationMessage: (message: string) => void = (message) => {
    setShowConfirmationBanner({ show: true, message: message });

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
      {children}
      {pageLoading ? <LoadingUx /> : null}
      {showConfirmationBanner.show ? (
        <ConfirmationBanner message={showConfirmationBanner.message} />
      ) : null}
    </CryptoContext.Provider>
  );
};
