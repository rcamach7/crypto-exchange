import { Navbar } from "../components/Home/Navbar";
import { useUserContext } from "../hooks/useUserContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { ProfileDrawer } from "../components/Home/ProfileDrawer";

export const Home = () => {
  const { cryptos } = useUserContext();
  return (
    <div className="Home">
      <Navbar />

      <div className="cryptosContainer">
        {cryptos.map((crypto) => {
          return <CryptoCard key={crypto.ticker} crypto={crypto} />;
        })}
      </div>
      <ProfileDrawer />
    </div>
  );
};
