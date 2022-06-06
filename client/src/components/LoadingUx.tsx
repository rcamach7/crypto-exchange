import { CircularProgress, Modal } from "@mui/material/";

export const LoadingUx = () => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <CircularProgress sx={{ maxHeight: "100%", color: "white" }} />
      </div>
    </Modal>
  );
};
