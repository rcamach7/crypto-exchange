import { useState } from "react";
import { Box, TextField, Button } from "@mui/material/";
import { SubmissionError, Account } from "../../global.models";
import { login } from "../../api/api";
import { useGlobalContext } from "../../context/";
import { setToken, useAppDispatch } from "../../features/";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const SignInForm: React.FC<Props> = ({ setShowCreateAccount }) => {
  const { togglePageLoading } = useGlobalContext();
  const dispatch = useAppDispatch();

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
      dispatch(setToken(token));
      togglePageLoading();
    } catch (error) {
      setPopulateErrors({
        error: true,
        helperText: "Incorrect email or password",
      });
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
        value={account.username}
        name="username"
        id="outlined-required"
        label="Username"
        autoComplete="username"
        onChange={handleInputChange}
      />
      <TextField
        required
        value={account.password}
        name="password"
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="password"
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
