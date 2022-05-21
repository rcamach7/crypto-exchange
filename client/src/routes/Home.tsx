import { useEffect } from "react";
import { useUserContext } from "../hooks/useUserContext";

export const Home = () => {
  const context = useUserContext();

  useEffect(() => {
    console.log(context);
  }, [context]);

  return (
    <div>
      <p></p>
    </div>
  );
};
