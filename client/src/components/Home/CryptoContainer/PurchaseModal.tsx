import { FC, useState } from "react";
import { Box, Button, Modal, useTheme } from "@mui/material/";
import { Crypto } from "../../../global.models";
import { PurchaseCryptoForm } from "../../forms/";

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
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenModal = async () => {
    await handleUpdateSingleCrypto(crypto.name);
    handleOpen();
  };

  return (
    <div>
      {/* Triggers the model below to be rendered */}
      <Button size="small" variant="outlined" onClick={handleOpenModal}>
        Purchase {crypto.ticker}
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            ...style,
            border:
              theme.palette.mode === "dark"
                ? "solid white 1px"
                : "solid black 1px",
          }}
        >
          <PurchaseCryptoForm crypto={crypto} handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};
