import { Navbar } from "../components/Home/Navbar";
import { useUserContext } from "../hooks/useUserContext";

export const Home = () => {
  const { cryptos } = useUserContext();
  return (
    <div className="Home">
      <Navbar />

      <div className="cryptosContainer">
        {cryptos.map(() => {
          return <li>Hello World</li>;
        })}
      </div>
    </div>
  );
};
