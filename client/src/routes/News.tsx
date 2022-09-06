import { NewsArticleCard, NewsSectionTitle } from "../components/Home/";
import { LoadingUx } from "../components/";
import { NewsArticleWrapper } from "../components/styled";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../features/";

export const News = () => {
  const newsArticles = useAppSelector((state) => state.newsArticles.value);
  const theme = useTheme();

  return (
    <NewsArticleWrapper theme={theme.palette.mode}>
      <NewsSectionTitle count={newsArticles.length} theme={theme} />

      <div className="newsArticlesContainer">
        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </div>

      {/* Will provide a overlapping loading UI component while news articles are being fetched. */}
      {!newsArticles.length && <LoadingUx />}
    </NewsArticleWrapper>
  );
};
