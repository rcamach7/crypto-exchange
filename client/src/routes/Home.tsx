import { useGlobalContext } from "../hooks/useGlobalContext";
import { CryptoCard } from "../components/Home/CryptoCard/CryptoCard";

export const Home = () => {
  const { cryptos, user } = useGlobalContext();
  return (
    <div className="Home">
      <div className="cryptosContainer">
        {cryptos.map((crypto) => {
          return <CryptoCard key={crypto.ticker} crypto={crypto} user={user} />;
        })}
      </div>
    </div>
  );
};
