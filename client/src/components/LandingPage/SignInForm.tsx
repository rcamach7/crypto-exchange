import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const SignInForm: React.FC<Props> = ({ setShowCreateAccount }) => {
  return (
    <Box
      className="SignInForm"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required id="outlined-required" label="Username" />
      <TextField
        required
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        helperText="Incorrect password or username"
      />
      <Button className="btn" variant="contained">
        Sign In
      </Button>
      <Button
        className="btn"
        onClick={() => setShowCreateAccount((prevState) => !prevState)}
      >
        Create Account
      </Button>
      <Button className="btn">Test Account</Button>
    </Box>
  );
};
