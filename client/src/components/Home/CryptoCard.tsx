import React from "react";
import { Crypto, User } from "../../data/models";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
} from "@mui/material/";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { PurchaseModal } from "./PurchaseModal";
import moment from "moment";
import { Link } from "react-router-dom";

interface Props {
  crypto: Crypto;
  user: User | null;
}

export const CryptoCard: React.FC<Props> = ({ crypto, user }) => {
  const {
    name,
    image,
    lastUpdated,
    price,
    marketHistory: {
      priceChangePercentage24h,
      priceChangePercentage7d,
      priceChangePercentage14d,
    },
  } = crypto;

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
          {user ? (
            <PurchaseModal crypto={crypto} />
          ) : (
            <Button size="small" variant="outlined">
              <Link to="/login">Login to purchase</Link>
            </Button>
          )}
          <IconButton color="primary" component="span">
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
