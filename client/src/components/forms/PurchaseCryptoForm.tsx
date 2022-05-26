import React from "react";
import { Button, TextField, Avatar } from "@mui/material/";
import { Crypto } from "../../data/models";
import { useUserContext } from "../../hooks/useUserContext";
import { formatPrice } from "../../assets/helpers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

interface Props {
  crypto: Crypto;
}

export const PurchaseCryptoForm: React.FC<Props> = ({ crypto }) => {
  const { user } = useUserContext();
  const [quantity, setQuantity] = React.useState<number>(0);

  const handlePurchase = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (quantity === 0) {
      alert("Please increase quantity");
    }
  };

  return (
    <form className="PurchaseCryptoForm" onSubmit={handlePurchase}>
      <div className="priceOverview">
        <div className="cryptoDetails">
          <Avatar
            sx={{ border: "solid black 1px" }}
            aria-label="crypto"
            src={crypto.image}
          />
          <div className="buyPrice">
            <p className="buyPrice">Buy Price</p>
            <p>${formatPrice(crypto.price)}</p>
          </div>
        </div>
        <div className="balanceDetails">
          <Avatar
            sx={{ border: "solid black 1px", backgroundColor: "black" }}
            aria-label="balance"
          >
            <AccountBalanceWalletIcon />
          </Avatar>
          <div className="balance">
            <p className="balance">Balance</p>
            <p>${formatPrice(user?.balance)}</p>
          </div>
        </div>
      </div>

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
          value={quantity}
          onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
        />

        <p className="totalCalculation">
          Total: ${formatPrice(quantity * crypto.price)}
        </p>
      </div>

      <Button type="submit" className="purchaseBtn" variant="contained">
        Confirm Purchase
      </Button>
    </form>
  );
};
