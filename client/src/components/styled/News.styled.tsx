import styled from "styled-components";

export const NewsArticleWrapper = styled.div`
  min-height: calc(100vh - 60px);
  padding-bottom: 15px;
  background-color: ${(props) => (props.theme === "light" ? "white" : "black")};

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
