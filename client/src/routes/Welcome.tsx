import { Link } from "react-router-dom";
import GrainIcon from "@mui/icons-material/Grain";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../features/";
import {
  WelcomePageWrapper,
  IntroCardWrapper,
  FeaturesWrapper,
} from "../components/styled/";
import { featuresData } from "../assets/staticData";

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
          {featuresData.map(({ text, animation }, index) => (
            <li key={index} className={animation}>
              <GrainIcon className="icon" />
              {text}
            </li>
          ))}
        </ul>

        <div className="expandedInfo animate__animated animate__fadeIn">
          {/* Only display once cryptos have been retrieved */}
          {cryptos.length > 0 && (
            <p className="intro">
              Invest in some of the worlds most popular cryptos!
            </p>
          )}
          <ul>
            {cryptos.slice(0, 10).map(({ ticker, image, name }) => {
              return (
                <li key={ticker}>
                  <img src={image} alt={name} className="cryptoImage" />
                  <p>{ticker}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </FeaturesWrapper>
    </WelcomePageWrapper>
  );
};
