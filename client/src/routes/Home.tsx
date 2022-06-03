import { useGlobalContext } from "../hooks/useGlobalContext";
import { CryptoCard } from "../components/Home/CryptoCard/CryptoCard";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material/";

export const Home = () => {
  const { cryptos, user } = useGlobalContext();
  return (
    <div className="Home">
      <div className="filterOptions">
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Filter By:
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
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
        {cryptos.map((crypto) => {
          return <CryptoCard key={crypto.ticker} crypto={crypto} user={user} />;
        })}
      </div>
    </div>
  );
};
