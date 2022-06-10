import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GrainIcon from "@mui/icons-material/Grain";
import bk from "../assets/bk.jpeg";

const IntroCardWrapper = styled.div`
  flex: 1.5;
  background-image: url(${bk});
  background-size: cover;
  padding: clamp(20px, 3vw, 50px);

  color: white;

  display: flex;
  justify-content: center;
  flex-direction: column;
  .subIntroText {
    font-size: clamp(15px, 1.5vw, 30px);
    margin-bottom: clamp(10px, 1vw, 30px);
  }
  h1 {
    font-size: clamp(30px, 4vw, 80px);
  }
  .actionButton {
    width: clamp(150px, 15vw, 200px);
    padding: 10px;
    margin-top: clamp(25px, 10vw, 100px);

    font-size: clamp(15px, 1.5vw, 30px);
    text-align: center;

    color: white;
    background-color: rgb(25, 119, 242);
    border-radius: 10px;
  }

  /* @media (min-width: 900px) {
    flex: 1.5;
  } */
`;

const FeaturesWrapper = styled.ul`
  flex: 1;
  padding: clamp(20px, 3vw, 50px);

  list-style: none;
  background-color: white;
  color: black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  li {
    display: flex;
    align-items: center;
    font-size: clamp(15px, 2.25vw, 20px);
    max-width: 800px;
    .icon {
      border-right: solid 1px white;
      font-size: clamp(25px, 2.5vw, 50px);
      margin-right: 10px;
    }
  }
`;

export const Welcome: React.FC = () => {
  return (
    <div className="Welcome">
      <IntroCardWrapper>
        <p className="subIntroText">Are you a first time crypto investor?</p>
        <h1>Practice cryptocurrency trading with virtual money!</h1>
        <Link className="actionButton" to="home">
          <p>Start Browsing</p>
        </Link>
      </IntroCardWrapper>

      <FeaturesWrapper>
        <li>
          <GrainIcon className="icon" />
          Crypto Exchange will help you gain confidence before risking your own
          money!
        </li>
        <li>
          <GrainIcon className="icon" />
          Get started with $1,000,000 USD to start making big money moves!
          Registration is free!
        </li>
        <li>
          <GrainIcon className="icon" /> All transactions are made at real time
          prices. Get updated information on your investment performances!
        </li>
      </FeaturesWrapper>
    </div>
  );
};
