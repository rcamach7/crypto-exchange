import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material/";
import { SubmissionError, Account } from "../../data/models";
import { login } from "../../data/api";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { useNavigate } from "react-router-dom";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const SignInForm: React.FC<Props> = ({ setShowCreateAccount }) => {
  const { togglePageLoading, setToken } = useGlobalContext();
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  let navigate = useNavigate();

  const [populateErrors, setPopulateErrors] = useState<SubmissionError>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSignIn = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    test?: boolean
  ) => {
    event.preventDefault();
    togglePageLoading();
    try {
      const token: string = await login(
        test ? { username: "odin", password: "odin" } : account
      );
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/crypto-exchange/home");
      togglePageLoading();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("404")) {
          setPopulateErrors({
            error: true,
            helperText: "Error communicating with server",
          });
        } else {
          setPopulateErrors({
            error: true,
            helperText: "Incorrect email or password",
          });
        }
      }
      togglePageLoading();
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
      <Button className="btn" onClick={(e) => handleSignIn(e, true)}>
        Test Account
      </Button>
    </Box>
  );
};
