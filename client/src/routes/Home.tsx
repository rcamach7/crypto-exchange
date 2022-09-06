import { determineThemeBackground } from "../utilities/helpers";
import { useAppSelector } from "../features/";
import { useTheme } from "@mui/material/styles";
import {
  CryptosContainer,
  NewsArticleCard,
  NewsSectionTitle,
} from "../components/Home";
import { LoadingUx } from "../components/";
import { HomeWrapper, NewsArticlesWrapper } from "../components/styled";

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
        <NewsSectionTitle count={newsArticles.length} theme={theme} />

        {/* Populates all individual news article cards */}
        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </NewsArticlesWrapper>

      {/* Will provide a loading icon while app is fetching cryptos or news from server */}
      {(!cryptos.length || !newsArticles.length) && <LoadingUx />}
    </HomeWrapper>
  );
};
