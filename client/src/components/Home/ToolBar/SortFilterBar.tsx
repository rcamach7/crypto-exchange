import React from "react";
import { FormControl, InputLabel } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import styled from "styled-components";
import { SortFilterOptions, SortBy, FilterBy } from "../../../global.models";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const FilterWrapper = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => (theme === "light" ? "white" : "black")};
`;

interface Props {
  setSortFilterOptions: React.Dispatch<React.SetStateAction<SortFilterOptions>>;
  loggedIn: boolean;
  theme: "light" | "dark";
}

export const SortFilterBar: React.FC<Props> = ({
  setSortFilterOptions,
  loggedIn,
  theme,
}) => {
  // Used to disable certain options that are only applicable if user is logged in (owned/bookmarked, etc).
  let disableIfNotLoggedIn = loggedIn ? {} : { disabled: true };

  const handleFilterOption = (event: SelectChangeEvent<string>) => {
    switch (event.target.value) {
      case FilterBy.Owned:
        setSortFilterOptions((prevState) => {
          return { ...prevState, filter: FilterBy.Owned };
        });
        break;
      case FilterBy.Bookmarked:
        setSortFilterOptions((prevState) => {
          return { ...prevState, filter: FilterBy.Bookmarked };
        });
        break;
      default:
        setSortFilterOptions((prevState) => {
          return { ...prevState, filter: FilterBy.None };
        });
    }
  };

  const handleSortOption = (event: SelectChangeEvent<string>) => {
    switch (event.target.value) {
      case SortBy.PriceAscending:
        setSortFilterOptions((prevState) => {
          return { ...prevState, sort: SortBy.PriceAscending };
        });
        break;
      case SortBy.PriceDescending:
        setSortFilterOptions((prevState) => {
          return { ...prevState, sort: SortBy.PriceDescending };
        });
        break;
      default:
        setSortFilterOptions((prevState) => {
          return { ...prevState, sort: SortBy.Popular };
        });
    }
  };

  return (
    <FilterWrapper theme={theme}>
      <FilterListIcon
        sx={{ fontSize: "35px", color: theme === "light" ? "black" : "white" }}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-native-select">Filter By:</InputLabel>
        <Select
          native
          defaultValue="None"
          id="grouped-native-select"
          label="Grouping"
          name="filter"
          onChange={handleFilterOption}
        >
          <option aria-label="popular" value="None">
            None
          </option>
          <option value="owned" {...disableIfNotLoggedIn}>
            Owned
          </option>
          <option value="bookmarked" {...disableIfNotLoggedIn}>
            Bookmarked
          </option>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-native-select">Sort By:</InputLabel>
        <Select
          native
          defaultValue="Popular"
          id="grouped-native-select"
          label="Grouping"
          onChange={handleSortOption}
          name="sort"
        >
          <option aria-label="Popular" value="Popular">
            Popular
          </option>
          <optgroup label="Price">
            <option value="price-ascending">Ascending</option>
            <option value="price-descending">Descending</option>
          </optgroup>
        </Select>
      </FormControl>
    </FilterWrapper>
  );
};
