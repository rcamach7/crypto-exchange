import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface Props {
  setShowCreateAccount: React.Dispatch<React.SetStateAction<Boolean>>;
}

export const CreateAccountForm: React.FC<Props> = ({
  setShowCreateAccount,
}) => {
  return (
    <Box
      className="CreateAccountForm"
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
      />
      <TextField
        required
        id="outlined-password-input"
        label="Confirm password"
        type="password"
        autoComplete="current-password"
      />
      <Button className="btn" variant="contained">
        Create Account
      </Button>
      <Button className="btn" variant="outlined">
        Already have an account?
      </Button>
    </Box>
  );
};
