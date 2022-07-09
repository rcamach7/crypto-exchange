import { useEffect } from "react";
import { getNewsArticles } from "../data/api";
import { NewsArticle } from "../data/global.models";
import { useAppDispatch } from "../features/hooks";
import { setNewsArticles } from "../features/newsArticles/newsArticlesSlice";

export const useFetchNewsArticles = () => {
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

    fetchNews();
  }, [dispatch]);
};
