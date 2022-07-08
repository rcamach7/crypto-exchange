import { useState, useEffect } from "react";
import { getNewsArticles } from "../data/api";
import { NewsArticle } from "../data/global.models";

export const useFetchNews = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles = await getNewsArticles();
        setNewsArticles(articles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNews();
  }, []);

  return newsArticles;
};
