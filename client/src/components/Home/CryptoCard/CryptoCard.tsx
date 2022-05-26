import React from "react";
import { Crypto } from "../../../data/models";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material/";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { PurchaseModal } from "./PurchaseModal";
import moment from "moment";

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
    <Box className="CryptoCard">
      <Card variant="outlined">
        <CardContent sx={{ padding: "16px 16px 8px 16px" }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            price updated {moment(lastUpdated).fromNow()}
          </Typography>

          <Typography
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Avatar
              sx={{ border: "solid black 1px" }}
              aria-label="recipe"
              src={image}
            />
            <span className="cryptoName">{name}</span>
            <Chip
              sx={{ marginLeft: "auto" }}
              label={price}
              color={priceChangePercentage24h > 0 ? "success" : "error"}
              icon={<AttachMoneyIcon fontSize="small" />}
            />
          </Typography>
          <Typography
            component="div"
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
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <PurchaseModal ticker={ticker} name={name} />
          <IconButton color="primary" component="span">
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
