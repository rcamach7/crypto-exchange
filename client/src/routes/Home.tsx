import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto, SortFilterOptions } from "../data/models";
import { processFilterSortOptions } from "../assets/helpers";
import { SortFilterBar } from "../components/Home/SortFilterBar";

export const Home = () => {
  const { cryptos, user, togglePageLoading } = useGlobalContext();
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
    setOrganizedCryptos(processFilterSortOptions(cryptos, sortFilterOptions));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFilterOptions]);

  return (
    <div className="Home">
      <SortFilterBar setSortFilterOptions={setSortFilterOptions} />
      <div className="cryptosContainer">
        {organizedCryptos.map((crypto) => {
          return <CryptoCard key={crypto.ticker} crypto={crypto} user={user} />;
        })}
      </div>
    </div>
  );
};
