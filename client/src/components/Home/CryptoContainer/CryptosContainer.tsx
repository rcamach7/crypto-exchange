import { useState, useEffect, FC } from "react";
import { Crypto } from "../../../global.models";
import { ResponseType, useGlobalContext } from "../../../context/";
import { ToolBar } from "../";
import { CryptoCard } from "./CryptoCard";
import { replaceUpdatedCrypto } from "../../../utilities/helpers";
import { updateSingleCrypto } from "../../../api/api";
import { Pagination } from "@mui/material";
import { useAppSelector } from "../../../features/";
import { CryptosWrapper } from "../../styled/";

interface Props {
  cryptos: Crypto[];
}

export const CryptosContainer: FC<Props> = ({ cryptos }) => {
  const user = useAppSelector((state) => state.user.value);
  const [organizedCryptos, setOrganizedCryptos] = useState<Crypto[]>([]);

  const { togglePageLoading, handleBannerMessage } = useGlobalContext();

  const [page, setPage] = useState(1);
  let ranges = [
    [0, 4],
    [4, 8],
    [8, 12],
    [12, 16],
    [16, 20],
    [20, 24],
    [24, 28],
    [28, 32],
  ];

  const handleUpdateSingleCrypto = async (name: string) => {
    togglePageLoading();
    try {
      const updatedCrypto = await updateSingleCrypto(name);
      setOrganizedCryptos((prevState) => {
        return replaceUpdatedCrypto(prevState, updatedCrypto);
      });
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      handleBannerMessage(
        ResponseType.Error,
        "Error updating crypto information"
      );
    }
  };

  useEffect(() => {
    if (cryptos.length) {
      setOrganizedCryptos(cryptos);
    }
  }, [cryptos]);

  return (
    <CryptosWrapper>
      <ToolBar
        user={user}
        cryptos={cryptos}
        organizedCryptos={organizedCryptos}
        setOrganizedCryptos={setOrganizedCryptos}
      />
      <div className="cryptosContainer">
        {organizedCryptos
          .slice(ranges[page - 1][0], ranges[page - 1][1])
          .map((crypto) => {
            return (
              <CryptoCard
                key={crypto.ticker}
                crypto={crypto}
                user={user}
                handleUpdateSingleCrypto={handleUpdateSingleCrypto}
                togglePageLoading={togglePageLoading}
                bookmarks={user ? user.bookmarks : []}
              />
            );
          })}
      </div>

      <Pagination
        count={Math.ceil(organizedCryptos.length / 4)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ flex: 1, padding: "10px 0" }}
      />
    </CryptosWrapper>
  );
};
