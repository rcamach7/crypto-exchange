import { SignInForm } from "../components/forms/SignInForm";
import { CreateAccountForm } from "../components/forms/CreateAccountForm";
import { useState } from "react";
import logo from "../data/logo.png";

export const LandingPage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState<Boolean>(false);

  return (
    <div className="LandingPage">
      <img src={logo} alt="" className="logo" />
      {showCreateAccount ? (
        <CreateAccountForm setShowCreateAccount={setShowCreateAccount} />
      ) : (
        <SignInForm setShowCreateAccount={setShowCreateAccount} />
      )}
    </div>
  );
};
