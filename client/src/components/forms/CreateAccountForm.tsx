import React from "react";
import { Box, TextField, Button } from "@mui/material/";
import { Account } from "../../global.models";
import { createAccount } from "../../api/api";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { ResponseType } from "../../context/";
import { SubmissionError } from "../../global.models";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const CreateAccountForm: React.FC<Props> = ({
  setShowCreateAccount,
}) => {
  const { togglePageLoading, handleBannerMessage } = useGlobalContext();
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
      // Validate passwords match before creating account.
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
          handleBannerMessage(
            ResponseType.Error,
            "Error communicating with server!"
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
        autoComplete="name"
        onChange={handleInputChange}
      />
      <TextField
        required
        id="outlined-required2"
        label="Username"
        name="username"
        autoComplete="username"
        onChange={handleInputChange}
        {...showTakenUsername}
      />
      <TextField
        required
        name="password"
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="password"
        onChange={handleInputChange}
        {...showPasswordError}
      />
      <TextField
        required
        name="confirmedPassword"
        id="outlined-password-input2"
        label="Confirm password"
        type="password"
        autoComplete="confirm-password"
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
