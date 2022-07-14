import { NewsArticleCard } from "../components/Home/NewsArticleCard";
import { useTheme } from "@mui/material";
import { useAppSelector } from "../features/hooks";
import { LoadingUx } from "../components/LoadingUx";
import { NewsArticleWrapper } from "../components/styled/News.styled";
import { NewsSectionTitle } from "../components/Home/NewsSectionTitle";

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
