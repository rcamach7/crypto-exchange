import styled from "styled-components";
import hero from "../../assets/hero.webp";

export const WelcomePageWrapper = styled.div`
  height: calc(100vh - 60px);
  max-height: -webkit-fill-available;

  display: flex;
  flex-direction: column;
`;

export const IntroCardWrapper = styled.div`
  flex: 1.5;

  background-image: url(${hero});
  @media (min-width: 700px) {
    background-size: auto;
  }

  background-size: cover;
  padding: 0 clamp(20px, 3vw, 50px);

  color: white;

  display: flex;
  justify-content: center;
  flex-direction: column;
  .subIntroText {
    font-size: clamp(15px, 1.5vw, 18px);
    margin-bottom: clamp(10px, 1vw, 30px);
  }
  h1 {
    font-size: clamp(30px, 4vw, 40px);
  }
  .actionButton {
    width: clamp(150px, 15vw, 190px);
    padding: 10px;
    margin-top: clamp(25px, 10vw, 80px);

    font-size: clamp(15px, 1.5vw, 18px);
    text-align: center;

    color: white;
    background-color: rgb(25, 119, 242);
    border-radius: 10px;
  }
`;

export const FeaturesWrapper = styled.div`
  flex: 1;
  padding: clamp(20px, 3vw, 50px);

  list-style: none;
  background-color: white;
  color: black;

  display: flex;
  .featuresList {
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    li {
      display: flex;
      align-items: center;
      font-size: 16px;
      max-width: 800px;
      .icon {
        border-right: solid 1px white;
        font-size: clamp(25px, 2.5vw, 50px);
        margin-right: 10px;
      }
    }
  }
  .expandedInfo {
    display: none;
    flex: 1;

    .intro {
      text-align: center;
      font-weight: bold;
      margin-bottom: 25px;
    }
    ul {
      max-width: 500px;
      padding: 0 25px;
      list-style: none;

      display: flex;
      justify-content: center;
      gap: 25px;
      flex-wrap: wrap;
      li {
        img {
          height: 50px;
          width: 50px;
        }
        p {
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }

  @media (min-width: 700px) {
    .expandedInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;
