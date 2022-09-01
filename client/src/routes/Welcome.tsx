import { Link } from "react-router-dom";
import GrainIcon from "@mui/icons-material/Grain";
import "animate.css";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../features/hooks";
import {
  WelcomePageWrapper,
  IntroCardWrapper,
  FeaturesWrapper,
} from "../components/styled/Welcome.styled";

export const Welcome: React.FC = () => {
  const theme = useTheme();
  const cryptos = useAppSelector((state) => state.cryptos.value);

  return (
    <WelcomePageWrapper>
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
          <p>Browse Cryptos</p>
        </Link>
      </IntroCardWrapper>

      <FeaturesWrapper theme={theme.palette.mode}>
        <ul className="featuresList">
          <li className="animate__animated animate__fadeIn animate__fast">
            <GrainIcon className="icon" />
            Crypto Exchange will help you gain confidence before risking your
            own money!
          </li>
          <li className="animate__animated animate__fadeIn animate__delay-1s animate__fast">
            <GrainIcon className="icon" />
            Get started with $1,000,000 USD to start making big money moves!
            Registration is free!
          </li>
          <li className="animate__animated animate__fadeIn animate__delay-2s animate__fast">
            <GrainIcon className="icon" />
            All transactions are made at real time prices. Get updated
            information on your investment performances!
          </li>
        </ul>

        <div className="expandedInfo animate__animated animate__fadeIn">
          {/* Only display once cryptos have been retrieved */}
          {cryptos.length > 0 && (
            <p className="intro">
              Invest in some of the worlds most popular cryptos!
            </p>
          )}
          <ul>
            {cryptos.slice(0, 10).map((crypto) => {
              return (
                <li key={crypto.ticker}>
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
    </WelcomePageWrapper>
  );
};
