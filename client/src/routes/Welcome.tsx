import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GrainIcon from "@mui/icons-material/Grain";
import an from "../assets/ans.webp";
import "animate.css";
import { useTheme } from "@mui/material/styles";
import { useGlobalContext } from "../context/GlobalCryptoContext";

const IntroCardWrapper = styled.div`
  flex: 1.5;

  background-image: url(${an});
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

const FeaturesWrapper = styled.div`
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

export const Welcome: React.FC = () => {
  const theme = useTheme();
  const { cryptos } = useGlobalContext();

  return (
    <div className="Welcome">
      <IntroCardWrapper>
        <p className="subIntroText">Are you a first time crypto investor?</p>
        <h1>Practice cryptocurrency trading with virtual money!</h1>
        <p className="subIntroText" style={{ marginTop: "10px" }}>
          See how far can you go!
        </p>
        <Link
          className="actionButton animate__animated animate__fadeInDown animate__slow"
          to="home"
        >
          <p>Start Browsing</p>
        </Link>
      </IntroCardWrapper>

      <FeaturesWrapper theme={theme.palette.mode}>
        <ul className="featuresList">
          <li className="animate__animated animate__fadeIn animate__fast">
            <GrainIcon className="icon" />
            Crypto Exchange will help you gain confidence before risking your
            own money!
          </li>
          <li className="animate__animated animate__fadeIn animate__delay-2s animate__fast">
            <GrainIcon className="icon" />
            Get started with $1,000,000 USD to start making big money moves!
            Registration is free!
          </li>
          <li className="animate__animated animate__fadeIn animate__delay-3s animate__fast">
            <GrainIcon className="icon" />
            All transactions are made at real time prices. Get updated
            information on your investment performances!
          </li>
        </ul>

        <div className="expandedInfo animate__animated animate__fadeIn animate__delay-4s animate__fast">
          <p className="intro">
            Invest in some of the worlds most popular cryptos!
          </p>
          <ul>
            {cryptos.slice(0, 10).map((crypto) => {
              return (
                <li>
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="cryptoImage"
                  />
                  <p>{crypto.ticker}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </FeaturesWrapper>
    </div>
  );
};
