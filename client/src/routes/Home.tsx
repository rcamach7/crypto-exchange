import { determineThemeBackground } from "../utilities/helpers";
import { useTheme } from "@mui/material/styles";
import { NewsArticleCard } from "../components/Home/NewsArticleCard";
import { CryptosContainer } from "../components/Home/CryptoContainer/CryptosContainer";
import { useAppSelector } from "../features/hooks";
import { LoadingUx } from "../components/LoadingUx";
import {
  HomeWrapper,
  NewsArticlesWrapper,
} from "../components/styled/Home.styled";
import { NewsSectionTitle } from "../components/Home/NewsSectionTitle";

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

        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </NewsArticlesWrapper>

      {/* Will provide a loading icon while app is fetching cryptos or news from server */}
      {(!cryptos.length || !newsArticles.length) && <LoadingUx />}
    </HomeWrapper>
  );
};
