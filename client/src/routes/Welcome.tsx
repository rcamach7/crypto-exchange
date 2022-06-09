import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IntroCard = styled.div`
  max-width: 90%;
  padding: clamp(20px, 3vw, 50px);

  display: flex;
  flex-direction: column;
  .subIntroText {
    font-size: clamp(15px, 1.5vw, 30px);
    margin-bottom: 5px;
  }
  h1 {
    font-size: clamp(30px, 4vw, 80px);
  }
  .actionButton {
    width: clamp(150px, 15vw, 200px);
    padding: 10px;
    margin-top: 10px;

    font-size: clamp(15px, 1.5vw, 30px);
    text-align: center;

    color: white;
    background-color: rgb(25, 119, 242);
    border-radius: 10px;
  }
`;

export const Welcome: React.FC = () => {
  return (
    <div className="Welcome">
      <IntroCard>
        <p className="subIntroText">Start with $1,000,000</p>
        <h1>Practice crypto trading with virtual money!</h1>
        <Link className="actionButton" to="/home">
          <p>Start Investing</p>
        </Link>
      </IntroCard>
    </div>
  );
};
