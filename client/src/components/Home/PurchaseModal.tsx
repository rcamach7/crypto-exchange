import { FC, useState } from "react";
import { Box, Button, Modal } from "@mui/material/";
import { Crypto } from "../../data/global.models";
import { PurchaseCryptoForm } from "../forms/PurchaseCryptoForm";

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
  handleUpdateSingleCrypto: (name: string) => void;
}

export const PurchaseModal: FC<Props> = ({
  crypto,
  handleUpdateSingleCrypto,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenModal = async () => {
    await handleUpdateSingleCrypto(crypto.name);
    handleOpen();
  };

  return (
    <div>
      <Button size="small" variant="outlined" onClick={handleOpenModal}>
        Purchase {crypto.ticker}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PurchaseCryptoForm crypto={crypto} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};
