import React from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { CryptoCard } from "../components/Home/CryptoCard/CryptoCard";
import { Crypto } from "../data/models";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material/";

export const Home = () => {
  const { cryptos, user } = useGlobalContext();
  const [filteredCryptos, setFilteredCryptos] = React.useState<Crypto[]>([]);

  React.useEffect(() => {
    if (cryptos.length) {
      setFilteredCryptos(cryptos);
    }
  }, [cryptos]);

  const handleFilterOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.value) {
      case "price":
        console.log("price selected");
        break;
      case "saved":
        console.log("saved selected");
        break;
      case "owned":
        console.log("owned selected");
        break;
      default:
        console.log("market cap selected");
        setFilteredCryptos(cryptos);
    }
  };

  return (
    <div className="Home">
      <div className="filterOptions">
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ textAlign: "center" }}
          >
            Filter By:
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            className="filterSelections"
            defaultValue="market cap"
            onChange={handleFilterOption}
          >
            <FormControlLabel
              sx={{ paddingTop: "5px" }}
              value="market cap"
              control={<Radio />}
              label="Market Cap"
            />
            <FormControlLabel value="price" control={<Radio />} label="Price" />
            <FormControlLabel
              value="saved"
              control={<Radio />}
              label="Saved"
              disabled
            />
            <FormControlLabel
              value="owned"
              disabled
              control={<Radio />}
              label="Owned"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="cryptosContainer">
        {filteredCryptos.map((crypto) => {
          return <CryptoCard key={crypto.ticker} crypto={crypto} user={user} />;
        })}
      </div>
    </div>
  );
};
