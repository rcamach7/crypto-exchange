import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  capitalizeFirstLetter,
  numberWithCommas,
} from "../../utilities/helpers";
import { Crypto, Error, User } from "../../global.models";
import { sellCrypto } from "../../api/api";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "../../features/hooks";
import { setUser } from "../../features/user/userSlice";

interface Props {
  crypto: Crypto;
  handleClose: () => void;
  walletQuantity: number;
}

export const SellCryptoForm: React.FC<Props> = ({
  crypto,
  handleClose,
  walletQuantity,
}) => {
  const { togglePageLoading, handleBannerMessage } = useGlobalContext();
  const dispatch = useAppDispatch();

  const [checked, setChecked] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<number>(0);
  const [error, setError] = React.useState<Error>({ exists: false });
  const theme = useTheme();

  const handleSell = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    togglePageLoading();

    if (quantity === 0 || Number.isNaN(quantity)) {
      setError({ exists: true, message: "Please enter a valid quantity" });
      togglePageLoading();
    } else {
      try {
        const user: User = await sellCrypto(crypto.name, quantity);
        dispatch(setUser(user));

        togglePageLoading();
        handleBannerMessage(
          "success",
          `Sold ${numberWithCommas(
            quantity
          )} ${crypto.ticker.toUpperCase()} coin${quantity > 1 ? "s" : ""}`
        );
        handleClose();
      } catch (error) {
        togglePageLoading();
        setError({ exists: true, message: error.response.data.message });
      }
    }
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  React.useEffect(() => {
    checked ? setQuantity(walletQuantity) : setQuantity(0);
  }, [checked, walletQuantity]);

  return (
    <form
      onSubmit={handleSell}
      className="SellCryptoForm"
      style={{
        color: theme.palette.mode === "light" ? "black" : "white",
      }}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ textAlign: "center" }}
      >
        Sell {capitalizeFirstLetter(crypto.name)}
      </Typography>

      <div className="priceOverview">
        <div className="cryptoDetails">
          <Avatar
            sx={{ border: "solid black 1px" }}
            aria-label="crypto"
            src={crypto.image}
          />
          <div className="buyPrice">
            <p className="buyPrice">Current Price</p>
            <p>${numberWithCommas(crypto.price)}</p>
          </div>
        </div>

        <div className="balanceDetails">
          <Avatar
            sx={{
              border: "solid black 1px",
              backgroundColor:
                theme.palette.mode === "dark" ? "white" : "black",
            }}
            aria-label="balance"
          >
            <AccountBalanceWalletIcon />
          </Avatar>
          <div className="balance">
            <p className="balance">Coin(s)</p>
            <p>{numberWithCommas(walletQuantity)}</p>
          </div>
        </div>
      </div>
      <div className="checkoutDetails">
        <div className="quantitySelectors">
          <TextField
            className="quantityInput"
            id="outlined-number"
            label="Enter Quantity"
            type="number"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: 0, max: walletQuantity },
            }}
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
          />
          <FormControlLabel
            className="checkBox"
            control={<Checkbox onChange={handleChecked} value={checked} />}
            label="sell max"
          />
        </div>

        <p className="totalCalculation">
          Total: ${numberWithCommas(quantity * crypto.price)}
        </p>
      </div>
      <Button type="submit" className="purchaseBtn" variant="contained">
        Confirm Sell Order
      </Button>
      <p style={{ fontSize: "10px", paddingTop: "2.5px" }}>
        transactions are made with real-time prices, above values are estimated
        and not final
      </p>
      {/* Error Reporting UI */}
      {error.exists && (
        <Alert severity="error" sx={{ marginTop: "10px", padding: "0 5px" }}>
          {error.message}
        </Alert>
      )}
    </form>
  );
};
