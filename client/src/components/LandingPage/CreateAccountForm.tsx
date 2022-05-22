import Box from "@mui/material/Box";
import React from "react";
import { Account } from "../../data/models";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createAccount } from "../../data/api";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const CreateAccountForm: React.FC<Props> = ({
  setShowCreateAccount,
}) => {
  const [account, setAccount] = React.useState<Account>({
    username: "",
    password: "",
    confirmedPassword: "",
  });

  // Error Handling
  const [showPasswordError, setShowPasswordError] = React.useState<{
    helperText?: string;
    error?: boolean;
  }>({});
  const [showTakenUsername, setTakenUsername] = React.useState<{
    helperText?: string;
    error?: boolean;
  }>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleCreateAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (account.password !== account.confirmedPassword) {
        setShowPasswordError({
          helperText: "Passwords don't match!",
          error: true,
        });
      } else {
        const token = await createAccount(account);
        localStorage.setItem("token", token);
        window.location.reload();
      }
    } catch (error) {
      setTakenUsername({ helperText: "Username taken already", error: true });
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
