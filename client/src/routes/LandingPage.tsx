import { SignInForm } from "../components/LandingPage/SignInForm";
import { CreateAccountForm } from "../components/LandingPage/CreateAccountForm";
import { useState } from "react";

export const LandingPage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState<Boolean>(false);

  return (
    <div className="LandingPage">
      {showCreateAccount ? (
        <CreateAccountForm setShowCreateAccount={setShowCreateAccount} />
      ) : (
        <SignInForm setShowCreateAccount={setShowCreateAccount} />
      )}
    </div>
  );
};
