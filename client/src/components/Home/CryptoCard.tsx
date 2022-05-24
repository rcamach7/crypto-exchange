import React from "react";
import { Crypto } from "../../data/models";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface Props {
  crypto: Crypto;
}

export const CryptoCard: React.FC<Props> = ({
  crypto: {
    name,
    image,
    lastUpdated,
    marketHistory: {
      priceChangePercentage14d,
      priceChangePercentage24h,
      priceChangePercentage7d,
    },
    price,
    ticker,
  },
}) => {
  return (
    <Box sx={{ minWidth: 300 }} className="CryptoCard">
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            price updated 10 minutes ago
          </Typography>

          <Typography
            variant="h5"
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <Avatar
              sx={{ border: "solid black 1px" }}
              aria-label="recipe"
              src={image}
            />
            {name}
            <Chip
              sx={{ marginLeft: "auto" }}
              label={price}
              color={priceChangePercentage24h > 0 ? "success" : "error"}
              icon={<AttachMoneyIcon fontSize="small" />}
            />
          </Typography>
          <Typography
            sx={{ marginTop: "5px" }}
            fontSize="small"
            // fontWeight="bold"
          >
            Price History
            <br />
            <div className="priceHistoryChips">
              <Chip
                sx={{ paddingLeft: "2px" }}
                color={priceChangePercentage24h > 0 ? "success" : "error"}
                variant="outlined"
                size="small"
                label={`${priceChangePercentage24h}%`}
                avatar={
                  <Avatar sx={{ backgroundColor: "transparent" }}>24h</Avatar>
                }
              />
              <Chip
                sx={{ paddingLeft: "2px" }}
                color={priceChangePercentage7d > 0 ? "success" : "error"}
                variant="outlined"
                size="small"
                label={`${priceChangePercentage7d}%`}
                avatar={
                  <Avatar sx={{ backgroundColor: "transparent" }}>7d</Avatar>
                }
              />
              <Chip
                sx={{ paddingLeft: "2px" }}
                color={priceChangePercentage14d > 0 ? "success" : "error"}
                variant="outlined"
                size="small"
                label={`${priceChangePercentage14d}%`}
                avatar={
                  <Avatar sx={{ backgroundColor: "transparent" }}>14d</Avatar>
                }
              />
            </div>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Purchase {ticker}</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
