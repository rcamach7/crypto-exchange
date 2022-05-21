import { useUserContext } from "../hooks/useUserContext";

export const Home = () => {
  const context = useUserContext();

  return (
    <div>
      <p>Hello Home</p>
    </div>
  );
};
