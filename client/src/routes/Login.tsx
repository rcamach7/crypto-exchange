import { SignInForm } from "../components/forms/SignInForm";
import { CreateAccountForm } from "../components/forms/CreateAccountForm";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import { determineThemeBackground } from "../data/helpers";

export const Login = () => {
  const [showCreateAccount, setShowCreateAccount] = useState<Boolean>(false);
  const theme = useTheme();

  return (
    <div
      className="Login"
      style={{ backgroundColor: determineThemeBackground(theme.palette.mode) }}
    >
      <img
        src={logo}
        alt=""
        className="logo"
        style={{ width: "250px", height: "250px", margin: "20px 0" }}
      />
      {showCreateAccount ? (
        <CreateAccountForm setShowCreateAccount={setShowCreateAccount} />
      ) : (
        <SignInForm setShowCreateAccount={setShowCreateAccount} />
      )}
    </div>
  );
};
