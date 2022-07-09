import React from "react";
import { useGlobalContext } from "../context/GlobalCryptoContext";
import { NewsArticleCard } from "../components/Home/NewsArticleCard";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { useTheme } from "@mui/material";
import styled from "styled-components";

const NewsArticleWrapper = styled.div`
  padding-bottom: 15px;

  display: flex;
  flex-direction: column;
  .newsArticlesContainer {
    width: 100%;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const News = () => {
  const { newsArticles } = useGlobalContext();
  const theme = useTheme();

  return (
    <NewsArticleWrapper>
      <span style={{ textAlign: "center", padding: "25px 0" }}>
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
      <div className="newsArticlesContainer">
        {newsArticles.map((article, i) => {
          return <NewsArticleCard key={i} article={article} />;
        })}
      </div>
    </NewsArticleWrapper>
  );
};
