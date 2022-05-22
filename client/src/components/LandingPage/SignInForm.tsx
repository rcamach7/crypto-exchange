import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SubmissionError, Account } from "../../data/models";
import { login } from "../../data/api";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const SignInForm: React.FC<Props> = ({ setShowCreateAccount }) => {
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const [populateErrors, setPopulateErrors] = useState<SubmissionError>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token: string = await login(account);
      localStorage.setItem("token", token);
    } catch (error) {
      setPopulateErrors({
        error: true,
        helperText: "Incorrect email or password",
      });
    }
  };

  return (
    <Box
      className="SignInForm"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      onSubmit={handleSignIn}
      autoComplete="off"
    >
      <TextField
        required
        name="username"
        id="outlined-required"
        label="Username"
        onChange={handleInputChange}
        {...populateErrors}
      />
      <TextField
        required
        name="password"
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={handleInputChange}
        {...populateErrors}
      />
      <Button className="btn" variant="contained" type="submit">
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
