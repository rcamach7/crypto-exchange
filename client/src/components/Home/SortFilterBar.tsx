import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";

export const SortFilterBar = () => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Sort</InputLabel>
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor="grouped-native-select">Filter</InputLabel>
        <Select
          native
          defaultValue="None"
          id="grouped-native-select"
          label="Grouping"
        >
          <option aria-label="popular" value="None">
            None
          </option>
          <option value="owned">Owned</option>
          <option value="bookmarked">Bookmarked</option>
        </Select>
      </FormControl>
    </div>
  );
};
