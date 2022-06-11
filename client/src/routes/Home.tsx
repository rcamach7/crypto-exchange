import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto, SortFilterOptions } from "../data/models";
import { processFilterSortOptions } from "../assets/helpers";
import { SortFilterBar } from "../components/Home/SortFilterBar";
import { updateSingleCrypto } from "../data/api";

export const Home = () => {
  const { cryptos, user, togglePageLoading, setUser } = useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = React.useState<Crypto[]>([]);
  const [sortFilterOptions, setSortFilterOptions] =
    React.useState<SortFilterOptions>({ sort: "popular", filter: "none" });

  React.useEffect(() => {
    togglePageLoading();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (cryptos.length) {
      togglePageLoading();
      setOrganizedCryptos(cryptos);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptos]);

  React.useEffect(() => {
    setOrganizedCryptos(
      processFilterSortOptions(
        cryptos,
        sortFilterOptions,
        user ? user.portfolio : []
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFilterOptions, user?.bookmarks]);

  const handleUpdateSingleCrypto = async (name: string) => {
    togglePageLoading();
    try {
      const updatedCrypto = await updateSingleCrypto(name);
      setOrganizedCryptos((prevState) => {
        const cryptosCopy = [...prevState];
        let indexOfOldCrypto = -1;
        cryptosCopy.forEach((crypto, i) => {
          if (crypto.name === updatedCrypto.name) {
            indexOfOldCrypto = i;
          }
        });
        if (indexOfOldCrypto > -1) {
          cryptosCopy[indexOfOldCrypto] = updatedCrypto;
        }

        return cryptosCopy;
      });
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      alert("Error updating crypto");
    }
  };

  return (
    <div className="Home">
      <SortFilterBar
        setSortFilterOptions={setSortFilterOptions}
        loggedIn={user ? true : false}
      />
      <div className="cryptosContainer">
        {organizedCryptos.map((crypto) => {
          return (
            <CryptoCard
              key={crypto.ticker}
              crypto={crypto}
              user={user}
              handleUpdateSingleCrypto={handleUpdateSingleCrypto}
              setUser={setUser}
              togglePageLoading={togglePageLoading}
            />
          );
        })}
      </div>
    </div>
  );
};
