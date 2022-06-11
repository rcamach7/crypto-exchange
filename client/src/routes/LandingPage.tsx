import { SignInForm } from "../components/forms/SignInForm";
import { CreateAccountForm } from "../components/forms/CreateAccountForm";
import { useState } from "react";
import logo from "../assets/logo.png";

export const LandingPage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState<Boolean>(false);

  return (
    <div className="LandingPage">
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
