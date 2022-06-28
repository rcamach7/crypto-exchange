import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface Props {
  type?: "success" | "error";
  message?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PopupBanner: React.FC<Props> = ({ type, message }) => {
  return (
    <Snackbar open={true}>
      <Alert severity={type ? type : "info"} sx={{ width: "100%" }}>
        {message ? message : "Request Processed Successfully"}
      </Alert>
    </Snackbar>
  );
};
