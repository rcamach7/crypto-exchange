import React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Avatar,
} from "@mui/material/";
import { Crypto } from "../../../data/models";
import { capitalizeFirstLetter } from "../../../assets/helpers";
import { formatPrice } from "../../../assets/helpers";

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
};

interface Props {
  crypto: Crypto;
}

export const PurchaseModal: React.FC<Props> = ({ crypto }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Purchase {capitalizeFirstLetter(crypto.name)}
          </Typography>
          <form className="PurchaseCryptoForm">
            <div className="priceOverview">
              <Avatar
                sx={{ border: "solid black 1px" }}
                aria-label="crypto"
                src={crypto.image}
              />
              <p>${formatPrice(crypto.price)}</p>
            </div>
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
                inputProps: { min: 0, defaultValue: 0 },
              }}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
};
