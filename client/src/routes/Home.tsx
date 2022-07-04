import { useGlobalContext } from "../context/GlobalCryptoContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto, SortFilterOptions } from "../data/global.models";
import { useState, useEffect } from "react";
import {
  processFilterSortOptions,
  replaceUpdatedCrypto,
  determineThemeBackground,
} from "../utilities/helpers";
import { SortFilterBar } from "../components/Home/SortFilterBar";
import { updateSingleCrypto } from "../data/api";
import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

export const Home = () => {
  const { cryptos, user, togglePageLoading, setUser, handleBannerMessage } =
    useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = useState<Crypto[]>([]);
  const [sortFilterOptions, setSortFilterOptions] = useState<SortFilterOptions>(
    { sort: "popular", filter: "none" }
  );
  const [page, setPage] = useState(1);
  let ranges = [
    [0, 9],
    [10, 19],
    [20, 29],
    [30, 39],
  ];

  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    togglePageLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (cryptos.length) {
      togglePageLoading();
      setOrganizedCryptos(cryptos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptos]);

  useEffect(() => {
    setOrganizedCryptos(
      processFilterSortOptions(
        cryptos,
        sortFilterOptions,
        user ? user.portfolio : [],
        user ? user.bookmarks : []
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFilterOptions, user?.bookmarks]);

  const handleUpdateSingleCrypto = async (name: string) => {
    togglePageLoading();
    try {
      const updatedCrypto = await updateSingleCrypto(name);
      setOrganizedCryptos((prevState) => {
        return replaceUpdatedCrypto(prevState, updatedCrypto);
      });
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      handleBannerMessage("error", "Error updating crypto information");
    }
  };

  return (
    <div
      className="Home"
      style={{
        backgroundColor: `${determineThemeBackground(theme.palette.mode)}`,
      }}
    >
      <SortFilterBar
        setSortFilterOptions={setSortFilterOptions}
        loggedIn={user ? true : false}
        theme={theme.palette.mode}
      />
      <div className="cryptosContainer">
        {/* {organizedCryptos.map((crypto) => {
          return (
            <CryptoCard
              key={crypto.ticker}
              crypto={crypto}
              user={user}
              handleUpdateSingleCrypto={handleUpdateSingleCrypto}
              setUser={setUser}
              togglePageLoading={togglePageLoading}
              bookmarks={user ? user.bookmarks : []}
            />
          );
        })} */}
        {organizedCryptos
          .slice(ranges[page - 1][0], ranges[page - 1][1])
          .map((crypto) => {
            return (
              <CryptoCard
                key={crypto.ticker}
                crypto={crypto}
                user={user}
                handleUpdateSingleCrypto={handleUpdateSingleCrypto}
                setUser={setUser}
                togglePageLoading={togglePageLoading}
                bookmarks={user ? user.bookmarks : []}
              />
            );
          })}

        <Pagination
          count={Math.ceil(organizedCryptos.length / 9)}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
