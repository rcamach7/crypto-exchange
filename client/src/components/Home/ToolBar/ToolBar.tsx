import { FC, useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, useTheme } from "@mui/material";
import { SortFilterBar } from "./SortFilterBar";
import {
  SortFilterOptions,
  Crypto,
  User,
  SortBy,
  FilterBy,
} from "../../../global.models";
import { processFilterSortOptions } from "../../../utilities/helpers";
import styled from "styled-components";

const ToolBarWrapper = styled.div`
  padding: 10px 0;
  flex: 1;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

interface Props {
  cryptos: Crypto[];
  organizedCryptos: Crypto[];
  setOrganizedCryptos: React.Dispatch<React.SetStateAction<Crypto[]>>;
  user: User | null;
}

export const ToolBar: FC<Props> = ({
  user,
  cryptos,
  organizedCryptos,
  setOrganizedCryptos,
}) => {
  const [sortFilterOptions, setSortFilterOptions] = useState<SortFilterOptions>(
    { sort: SortBy.Popular, filter: FilterBy.None }
  );
  const theme = useTheme();

  const handleSearch = (value: string | null) => {
    if (value) {
      setOrganizedCryptos(
        organizedCryptos.filter((curCrypto) => curCrypto.name.includes(value))
      );
    } else {
      setOrganizedCryptos(cryptos);
    }
  };

  useEffect(() => {
    setOrganizedCryptos(
      processFilterSortOptions(
        cryptos,
        sortFilterOptions,
        user ? user.portfolio : [],
        user ? user.bookmarks : []
      )
    );
  }, [sortFilterOptions, cryptos, user, setOrganizedCryptos]);

  return (
    <ToolBarWrapper>
      <SortFilterBar
        setSortFilterOptions={setSortFilterOptions}
        loggedIn={user ? true : false}
        theme={theme.palette.mode}
      />

      <Autocomplete
        id="free-solo-demo"
        options={organizedCryptos.map((crypto) => crypto.name)}
        renderInput={(params) => <TextField {...params} label="Search..." />}
        sx={{ minWidth: "200px" }}
        size="small"
        onChange={(e, value) => handleSearch(value)}
        freeSolo
      />
    </ToolBarWrapper>
  );
};
