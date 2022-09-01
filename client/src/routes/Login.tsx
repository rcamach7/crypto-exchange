import { SignInForm } from "../components/forms/SignInForm";
import { CreateAccountForm } from "../components/forms/CreateAccountForm";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useTheme } from "@mui/material/styles";
import { determineThemeBackground } from "../utilities/helpers";
import { LoginWrapper } from "../components/styled/Login.styled";

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
