import React from "react";
import { Box, Button, Modal } from "@mui/material/";
import { Crypto } from "../../../global.models";
import { SellCryptoForm } from "../../forms/";

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
  paddingTop: "10px",
};

interface Props {
  crypto: Crypto;
  walletQuantity: number;
}

export const SellCryptoModal: React.FC<Props> = ({
  crypto,
  walletQuantity,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button will trigger the model below to be displayed */}
      <Button size="small" variant="outlined" onClick={handleOpen}>
        Sell {crypto.ticker}
      </Button>

      {/* Rendered once triggered by button. */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <SellCryptoForm
            crypto={crypto}
            handleClose={handleClose}
            walletQuantity={walletQuantity}
          />
        </Box>
      </Modal>
    </div>
  );
};
