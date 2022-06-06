import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface Props {
  message?: string;
}

export const ConfirmationBanner: React.FC<Props> = ({ message }) => {
  return (
    <Snackbar open={true}>
      <Alert severity="success" sx={{ width: "100%" }}>
        {message ? message : "This is a success message!"}
      </Alert>
    </Snackbar>
  );
};
