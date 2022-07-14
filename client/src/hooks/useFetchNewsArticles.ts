import { useEffect } from "react";
import { getNewsArticles } from "../api/api";
import { NewsArticle } from "../global.models";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setNewsArticles } from "../features/newsArticles/newsArticlesSlice";

export const useFetchNewsArticles = () => {
  const newsArticles = useAppSelector((state) => state.newsArticles.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles: NewsArticle[] = await getNewsArticles();
        dispatch(setNewsArticles(articles));
      } catch (error) {
        console.log(error);
      }
    };

    if (!newsArticles.length) {
      fetchNews();
    }
  }, [dispatch, newsArticles]);
};
