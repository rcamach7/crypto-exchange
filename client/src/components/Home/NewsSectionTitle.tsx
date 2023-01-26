import React from "react";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { Theme, Typography } from "@mui/material";

interface Props {
  count: number;
  theme: Theme;
}

export const NewsSectionTitle: React.FC<Props> = ({ count, theme }) => {
  return (
    <span style={{ textAlign: "center", padding: "41px 0 15px 0" }}>
      {count ? (
        // Title will be non-existent if news articles have yet to be loaded.
        <span
          style={{
            width: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            color: theme.palette.mode === "light" ? "black" : "white",
          }}
        >
          <OnlinePredictionIcon
            color="success"
            className="animate__animated animate__fadeIn animate__infinite animate__slower"
          />
          <Typography>Trending News</Typography>
          <OnlinePredictionIcon
            color="success"
            className="animate__animated animate__fadeIn animate__infinite animate__slower"
          />
        </span>
      ) : null}
    </span>
  );
};
