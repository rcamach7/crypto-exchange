import { useGlobalContext } from "../context/GlobalCryptoContext";
import { determineThemeBackground } from "../utilities/helpers";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { NewsArticleCard } from "../components/Home/NewsArticleCard";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { CryptosContainer } from "../components/Home/CryptosContainer";

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

const NewsArticlesWrapper = styled.div`
  display: none;
  padding: 0 5px;
  @media (min-width: 1000px) {
    width: 300px;
    height: 90vh;

    overflow: scroll;
    /* outline: auto; */
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
    margin-right: 5px;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Home = () => {
  const { newsArticles } = useGlobalContext();
  const theme = useTheme();

  return (
    <HomeWrapper
      style={{
        backgroundColor: `${determineThemeBackground(theme.palette.mode)}`,
      }}
    >
      <CryptosContainer />

      <NewsArticlesWrapper>
        <span style={{ textAlign: "center", paddingTop: "25px" }}>
          {newsArticles.length ? (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                color: theme.palette.mode === "light" ? "black" : "white",
              }}
            >
              <OnlinePredictionIcon
                color="success"
                className="animate__animated animate__fadeIn animate__infinite animate__slower"
              />
              Trending News
              <OnlinePredictionIcon
                color="success"
                className="animate__animated animate__fadeIn animate__infinite animate__slower"
              />
            </span>
          ) : (
            ""
          )}
        </span>
        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </NewsArticlesWrapper>
    </HomeWrapper>
  );
};
