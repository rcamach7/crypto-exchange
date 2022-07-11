import { determineThemeBackground } from "../utilities/helpers";
import { useTheme } from "@mui/material/styles";
import { NewsArticleCard } from "../components/Home/NewsArticleCard";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { CryptosContainer } from "../components/Home/CryptoContainer/CryptosContainer";
import { useAppSelector } from "../features/hooks";
import { LoadingUx } from "../components/LoadingUx";
import {
  HomeWrapper,
  NewsArticlesWrapper,
} from "../components/styled/Home.styled";

export const Home = () => {
  const newsArticles = useAppSelector((state) => state.newsArticles.value);
  const cryptos = useAppSelector((state) => state.cryptos.value);

  const theme = useTheme();

  return (
    <HomeWrapper
      style={{
        backgroundColor: `${determineThemeBackground(theme.palette.mode)}`,
      }}
    >
      <CryptosContainer cryptos={cryptos} />

      <NewsArticlesWrapper>
        <span style={{ textAlign: "center", padding: "25px 0 15px 0" }}>
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

      {/* Will provide a loading icon while app is fetching cryptos and news from server */}
      {(!cryptos.length || !newsArticles.length) && <LoadingUx />}
    </HomeWrapper>
  );
};
