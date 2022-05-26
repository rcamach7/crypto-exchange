import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Avatar,
  Chip,
} from "@mui/material/";
import { Crypto } from "../../../data/models";
import { capitalizeFirstLetter } from "../../../assets/helpers";
import { formatPrice } from "../../../assets/helpers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useUserContext } from "../../../hooks/useUserContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(300px, 90vw, 400px)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  paddingBottom: "5px",
};

interface Props {
  crypto: Crypto;
}

export const PurchaseModal: React.FC<Props> = ({ crypto }) => {
  const { user } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState<number>(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePurchase = () => {};

  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleOpen}>
        Purchase {crypto.ticker}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Purchase {capitalizeFirstLetter(crypto.name)}
          </Typography>
          <form className="PurchaseCryptoForm">
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

            <Button className="purchaseBtn" variant="contained">
              Confirm Purchase
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
