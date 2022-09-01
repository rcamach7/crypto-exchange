import styled from "styled-components";

export const SellCryptoFormWrapper = styled.div`
  padding: 10px 0;

  .priceOverview {
    margin-bottom: 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .cryptoDetails {
      display: flex;
      align-items: center;
      .buyPrice {
        font-size: 10px;
      }
      p {
        padding: 0 5px;
        font-size: 14px;
      }
    }
    .balanceDetails {
      display: flex;
      align-items: center;
      .balance {
        font-size: 10px;
      }
      p {
        padding: 0 5px;
        font-size: 14px;
      }
    }
  }

  .checkoutDetails {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .quantitySelectors {
      .quantityInput {
        width: 125px;
      }
      .checkBox {
        margin-left: 5px;
      }
    }
    .totalCalculation {
      padding: 10px 5px;
      font-size: 14px;
    }
  }
`;

export const PurchaseCryptoFormWrapper = styled.div`
  padding: 10px 0;

  .priceOverview {
    margin-bottom: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .cryptoDetails {
      display: flex;
      align-items: center;
      .buyPrice {
        font-size: 10px;
      }
      p {
        padding: 0 5px;
        font-size: 14px;
      }
    }
    .balanceDetails {
      display: flex;
      align-items: center;
      .balance {
        font-size: 10px;
      }
      p {
        padding: 0 5px;
        font-size: 14px;
      }
    }
  }

  .currentlyOwnedInfo {
    font-size: 13px;
    margin-bottom: 30px;
    padding-left: 5px;
  }

  .checkoutDetails {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .quantityInput {
      width: 120px;
    }
    .totalCalculation {
      padding: 10px 5px;
      font-size: 14px;
    }
  }
`;
