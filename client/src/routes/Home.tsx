import { useGlobalContext } from "../context/GlobalCryptoContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto } from "../data/global.models";
import { useState, useEffect } from "react";
import {
  replaceUpdatedCrypto,
  determineThemeBackground,
} from "../utilities/helpers";
import { updateSingleCrypto } from "../data/api";
import { useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import { ToolBar } from "../components/Home/ToolBar/ToolBar";
import styled from "styled-components";
import { NewsArticleCard } from "../components/Home/NewsArticleCard";

const HomeWrapper = styled.div`
  min-height: calc(100vh - 64px);

  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: stretch;
  }
`;
const CryptosWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  .cryptosContainer {
    flex: 8;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
  }
`;
const NewsArticlesWrapper = styled.div`
  display: none;
  @media (min-width: 1000px) {
    width: 300px;
    height: 90vh;
    overflow: scroll;

    /* outline: auto; */

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Home = () => {
  const {
    cryptos,
    user,
    togglePageLoading,
    setUser,
    handleBannerMessage,
    newsArticles,
  } = useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = useState<Crypto[]>([]);

  const [page, setPage] = useState(1);
  let ranges = [
    [0, 9],
    [9, 18],
    [18, 27],
    [27, 36],
  ];
  const theme = useTheme();

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
    <HomeWrapper
      style={{
        backgroundColor: `${determineThemeBackground(theme.palette.mode)}`,
      }}
    >
      <CryptosWrapper>
        <ToolBar
          user={user}
          cryptos={cryptos}
          organizedCryptos={organizedCryptos}
          setOrganizedCryptos={setOrganizedCryptos}
        />
        <div className="cryptosContainer">
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
        </div>
        <Pagination
          count={Math.ceil(organizedCryptos.length / 9)}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{ flex: 1, padding: "10px 0" }}
        />
      </CryptosWrapper>

      <NewsArticlesWrapper>
        <p style={{ textAlign: "center", paddingTop: "25px" }}>
          {newsArticles.length ? "Trending News" : ""}
        </p>
        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </NewsArticlesWrapper>
    </HomeWrapper>
  );
};
