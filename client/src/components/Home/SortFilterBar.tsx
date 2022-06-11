import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import styled from "styled-components";
import { SortFilterOptions } from "../../data/models";

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  setSortFilterOptions: React.Dispatch<React.SetStateAction<SortFilterOptions>>;
}

export const SortFilterBar: React.FC<Props> = ({ setSortFilterOptions }) => {
  return (
    <FilterWrapper>
      <FilterListIcon sx={{ fontSize: "35px" }} />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-native-select">Sort By:</InputLabel>
        <Select
          native
          defaultValue="Popular"
          id="grouped-native-select"
          label="Grouping"
        >
          <option aria-label="Popular" value="Popular">
            Popular
          </option>
          <optgroup label="Price">
            <option value={1}>Ascending</option>
            <option value={2}>Descending</option>
          </optgroup>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel htmlFor="grouped-native-select">Filter By:</InputLabel>
        <Select
          native
          defaultValue="None"
          id="grouped-native-select"
          label="Grouping"
        >
          <option aria-label="popular" value="None">
            None
          </option>
          <option value="owned" disabled>
            Owned
          </option>
          <option value="bookmarked" disabled>
            Bookmarked
          </option>
        </Select>
      </FormControl>
    </FilterWrapper>
  );
};
