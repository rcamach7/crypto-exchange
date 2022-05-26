import React from "react";
import { Button, TextField, Avatar } from "@mui/material/";
import { Crypto } from "../../data/models";
import { useUserContext } from "../../hooks/useUserContext";
import { formatPrice } from "../../assets/helpers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { purchaseCrypto } from "../../data/api";
import { User } from "../../data/models";

interface Props {
  crypto: Crypto;
  handleClose: () => void;
}

export const PurchaseCryptoForm: React.FC<Props> = ({
  crypto,
  handleClose,
}) => {
  const { user, setUser } = useUserContext();
  const [quantity, setQuantity] = React.useState<number>(0);

  const handlePurchase = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (quantity === 0) {
      alert("Please increase quantity");
    } else {
      try {
        const user: User = await purchaseCrypto(crypto.name, quantity);
        setUser(user);
        handleClose();
      } catch (error) {
        console.log(error);
        alert("Error processing purchase");
      }
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
