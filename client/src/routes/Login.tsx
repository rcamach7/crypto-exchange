import { SignInForm, CreateAccountForm } from "../components/forms/";
import { LoginWrapper } from "../components/styled/";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import { determineThemeBackground } from "../utilities/helpers";

export const Login = () => {
  const [showCreateAccount, setShowCreateAccount] = useState<Boolean>(false);
  const theme = useTheme();

  return (
    <LoginWrapper
      backgroundColor={determineThemeBackground(theme.palette.mode)}
    >
      <img
        src={logo}
        alt="logo"
        className="logo"
        style={{ height: showCreateAccount ? "175px" : "200px" }}
      />

      {showCreateAccount ? (
        <CreateAccountForm setShowCreateAccount={setShowCreateAccount} />
      ) : (
        <SignInForm setShowCreateAccount={setShowCreateAccount} />
      )}
    </LoginWrapper>
  );
};
