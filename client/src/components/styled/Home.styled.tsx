import styled from "styled-components";

export const HomeWrapper = styled.div`
  min-height: calc(100vh - 60px);

  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 1000px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

export const NewsArticlesWrapper = styled.div`
  display: none;

  @media (min-width: 1000px) {
    width: 300px;
    height: 90vh;

    overflow: scroll;
    margin-right: 5px;

    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const CryptosWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  .cryptosContainer {
    flex: 8;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 10px;
  }
`;

export const CryptoCardWrapper = styled.div`
  min-width: 310px;
  .priceHistoryChips {
    padding-top: 5px;

    display: flex;
    max-width: 300px;
    flex-wrap: wrap;
    gap: 5px;
  }
  .cryptoName {
    max-width: 140px;
    overflow: scroll;
    white-space: nowrap;
  }
`;
