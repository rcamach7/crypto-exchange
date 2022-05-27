import { SignInForm } from "../components/LandingPage/SignInForm";
import { CreateAccountForm } from "../components/forms/CreateAccountForm";
import { useState } from "react";
import logo from "../data/logo.png";
import backdrop from "../data/coinsFalling.gif";

export const LandingPage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState<Boolean>(false);

  return (
    <div
      className="LandingPage"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <img src={logo} alt="" className="logo" />
      {showCreateAccount ? (
        <CreateAccountForm setShowCreateAccount={setShowCreateAccount} />
      ) : (
        <SignInForm setShowCreateAccount={setShowCreateAccount} />
      )}
    </div>
  );
};
