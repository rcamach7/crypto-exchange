import { useState, SyntheticEvent, FC } from "react";
import { Button, TextField, Avatar, Alert, Typography } from "@mui/material/";
import { Crypto } from "../../global.models";
import { useGlobalContext, ResponseType } from "../../context/";
import {
  capitalizeFirstLetter,
  formatPrice,
  numberWithCommas,
  getUserQuantityOwned,
} from "../../utilities/helpers";
import { purchaseCrypto } from "../../api/api";
import { User, Error } from "../../global.models";
import { useTheme } from "@mui/material/styles";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useAppDispatch, useAppSelector, setUser } from "../../features/";
import { PurchaseCryptoFormWrapper } from "../styled/";

interface Props {
  crypto: Crypto;
  handleClose: () => void;
}

export const PurchaseCryptoForm: FC<Props> = ({ crypto, handleClose }) => {
  const { togglePageLoading, handleBannerMessage } = useGlobalContext();
  const theme = useTheme();

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<Error>({ exists: false });

  let ownedQuantity = getUserQuantityOwned(
    user ? user.portfolio : [],
    crypto.name
  );

  const handlePurchase = async (event: SyntheticEvent) => {
    event.preventDefault();
    togglePageLoading();

    if (quantity === 0) {
      setError({
        exists: true,
        message: "Please enter quantity greater than zero",
      });
      togglePageLoading();
    } else {
      try {
        const user: User = await purchaseCrypto(crypto.name, quantity);
        dispatch(setUser(user));

        togglePageLoading();
        handleBannerMessage(
          ResponseType.Success,
          `Purchased ${numberWithCommas(
            quantity
          )} ${crypto.ticker.toUpperCase()} coin${quantity > 1 ? "s" : ""}`
        );
        handleClose();
      } catch (error) {
        setError({ exists: true, message: error.response.data.message });
        togglePageLoading();
      }
    }
  };

  return (
    <PurchaseCryptoFormWrapper>
      <form
        onSubmit={handlePurchase}
        style={{
          color: theme.palette.mode === "light" ? "black" : "white",
          position: "relative",
        }}
      >
        {/* Form title */}
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center" }}
        >
          Purchase {capitalizeFirstLetter(crypto.name)}
        </Typography>

        {/* Overview of crypto price details, along with the account balance of user. */}
        <div className="priceOverview">
          <div className="cryptoDetails">
            <Avatar
              sx={{ border: "solid black 1px" }}
              aria-label="crypto"
              src={crypto.image}
            />
            <div className="buyPrice">
              <p className="buyPrice">Buy Price</p>
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
              <AccountBalanceIcon />
            </Avatar>
            <div className="balance">
              <p className="balance">Cash Balance</p>
              <p>
                ${user?.balance && numberWithCommas(formatPrice(user?.balance))}
              </p>
            </div>
          </div>
        </div>

        {/* Displays currently owned cryptos, if any. */}
        <div className="currentlyOwnedInfo">
          {ownedQuantity > 0 ? (
            <p>
              You currently own
              {` ${ownedQuantity} ${crypto.name}${
                ownedQuantity > 1 ? "s" : ""
              } coin${ownedQuantity > 1 ? "s" : ""}.`}
            </p>
          ) : (
            <p>You don't currently own any {crypto.name}</p>
          )}
        </div>

        {/* Quantity input along with estimated value of purchase. */}
        <div className="checkoutDetails">
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
              inputProps: { min: 0 },
            }}
            value={isNaN(quantity) ? "" : quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
            required
          />

          <p className="totalCalculation">
            Total: $
            {isNaN(quantity) ? 0 : numberWithCommas(quantity * crypto.price)}
          </p>
        </div>

        <Button type="submit" className="purchaseBtn" variant="contained">
          Confirm Purchase
        </Button>
        <p style={{ fontSize: "10px", paddingTop: "2.5px" }}>
          transactions are made with real-time prices, above values are
          estimated and not final
        </p>

        {/* Error feedback */}
        {error.exists && (
          <Alert severity="error" sx={{ marginTop: "10px", padding: "0 5px" }}>
            {error.message}
          </Alert>
        )}
      </form>
    </PurchaseCryptoFormWrapper>
  );
};
