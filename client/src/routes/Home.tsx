import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto } from "../data/models";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material/";
import { sortByPriceAscending, sortByPriceDescending } from "../assets/helpers";
import styled from "styled-components";

const Title = styled.p`
  font-size: 10px;
  padding-right: 5px;
`;

export const Home = () => {
  const { cryptos, user } = useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = React.useState<Crypto[]>([]);

  React.useEffect(() => {
    if (cryptos.length) {
      setOrganizedCryptos(cryptos);
    }
  }, [cryptos]);

  const handleSortOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case "price+":
        setOrganizedCryptos((prevState) => sortByPriceDescending(prevState));
        break;
      case "price-":
        setOrganizedCryptos((prevState) => sortByPriceAscending(prevState));
        break;
      default:
        setOrganizedCryptos(cryptos);
    }
  };

  return (
    <div className="Home">
      <div className="filterOptions">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="filterSelections"
            defaultValue="popularity"
            onChange={handleSortOption}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Title style={{ fontSize: "10px", paddingRight: "5px" }}>
              Sort by:
            </Title>
            <FormControlLabel
              value="popularity"
              control={<Radio size="small" />}
              label="Popularity"
            />
            <FormControlLabel
              value="price+"
              control={<Radio size="small" />}
              label="Price +"
            />
            <FormControlLabel
              value="price-"
              control={<Radio size="small" />}
              label="Price -"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="cryptosContainer">
        {organizedCryptos.map((crypto) => {
          return <CryptoCard key={crypto.ticker} crypto={crypto} user={user} />;
        })}
      </div>
    </div>
  );
};
