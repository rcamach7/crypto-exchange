import styled from "styled-components";

export const NavbarWrapper = styled.div`
  // Removes gradient that comes with MUI styling
  background-image: none !important;
  .logoContainer {
    display: flex;
    align-items: center;
    .logoImg {
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
    .title {
      font-size: 25px;
      font-family: "Kdam Thmor Pro", sans-serif;
    }
  }
  .navbarContainer {
    background-color: black;

    .userAvatar {
      background-color: lightgray;
      color: black;
    }
  }
`;

export const ProfileDrawerWrapper = styled.div`
  .tableHeaders {
    padding-top: 5px;
  }

  .portfolioSummary {
    padding: 10px 0;
    border-bottom: solid black 1px;

    gap: 5px;
    .portfolioDetails {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      padding: 0 16px;
      .valueTitle {
        font-size: 12px;
      }
    }
    .portfolioBreakdown {
      padding: 0 16px;
      p {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  }
  .walletIcon {
    padding-top: 10px;
    display: flex;
    justify-content: center;
  }
`;
