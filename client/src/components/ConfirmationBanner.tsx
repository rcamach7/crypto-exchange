import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface Props {
  message?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ConfirmationBanner: React.FC<Props> = ({ message }) => {
  return (
    <Snackbar open={true}>
      <Alert severity="success" sx={{ width: "100%" }}>
        {message ? message : "Request Processed Successfully"}
      </Alert>
    </Snackbar>
  );
};
