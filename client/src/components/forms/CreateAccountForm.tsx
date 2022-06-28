import React from "react";
import { Box, TextField, Button } from "@mui/material/";
import { Account } from "../../data/global.models";
import { createAccount } from "../../data/api";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { SubmissionError } from "../../data/global.models";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const CreateAccountForm: React.FC<Props> = ({
  setShowCreateAccount,
}) => {
  const { togglePageLoading } = useGlobalContext();
  const [account, setAccount] = React.useState<Account>({
    username: "",
    password: "",
    fullName: "",
    confirmedPassword: "",
  });

  // Error Handling
  const [showPasswordError, setShowPasswordError] =
    React.useState<SubmissionError>({});
  const [showTakenUsername, setTakenUsername] = React.useState<SubmissionError>(
    {}
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    togglePageLoading();
    try {
      if (account.password !== account.confirmedPassword) {
        setShowPasswordError({
          helperText: "Passwords don't match!",
          error: true,
        });
        togglePageLoading();
      } else {
        const token = await createAccount(account);
        localStorage.setItem("token", token);
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("404")) {
          alert(
            "Error communicating with server! If error persists, please reach out at contact@ricardo-camacho.dev"
          );
        } else {
          setTakenUsername({
            helperText: "Username taken already",
            error: true,
          });
        }
      }
      togglePageLoading();
    }
  };

  return (
    <Box
      className="CreateAccountForm"
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={handleCreateAccount}
    >
      <TextField
        required
        id="outlined-required"
        label="Name"
        name="fullName"
        onChange={handleInputChange}
      />
      <TextField
        required
        id="outlined-required2"
        label="Username"
        name="username"
        onChange={handleInputChange}
        {...showTakenUsername}
      />
      <TextField
        required
        name="password"
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={handleInputChange}
        {...showPasswordError}
      />
      <TextField
        required
        name="confirmedPassword"
        id="outlined-password-input2"
        label="Confirm password"
        type="password"
        autoComplete="current-password"
        onChange={handleInputChange}
        {...showPasswordError}
      />
      <Button className="btn" variant="contained" type="submit">
        Create Account
      </Button>
      <Button
        className="btn"
        onClick={() => setShowCreateAccount((prevState) => !prevState)}
      >
        Already have an account?
      </Button>
    </Box>
  );
};
