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
import RefreshIcon from "@mui/icons-material/Refresh";
import { PurchaseModal } from "./PurchaseModal";
import moment from "moment";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../assets/helpers";
import { bookmarkCrypto } from "../../data/api";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import "animate.css";

interface Props {
  crypto: Crypto;
  user: User | null;
  handleUpdateSingleCrypto: (name: string) => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  togglePageLoading: () => void;
  bookmarks: [];
}

export const CryptoCard: React.FC<Props> = ({
  crypto,
  user,
  handleUpdateSingleCrypto,
  setUser,
  togglePageLoading,
  bookmarks,
}) => {
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

  const amBookmarked: () => boolean = () => {
    const bookmarked: string[] = bookmarks.map(({ name }) => name);
    let foundIndex = bookmarked.indexOf(name);
    if (foundIndex > -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleBookmark: (name: string) => void = async (name) => {
    togglePageLoading();
    try {
      const user = await bookmarkCrypto(name);
      setUser(user);
      togglePageLoading();
    } catch (error) {
      alert("Error bookmarking crypto");
      togglePageLoading();
    }
  };

  return (
    <Box className="CryptoCard animate__animated animate__zoomIn">
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
              label={numberWithCommas(price)}
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
        <CardActions sx={{ display: "flex" }}>
          {user ? (
            <PurchaseModal crypto={crypto} />
          ) : (
            <Button size="small" variant="outlined">
              <Link to="/crypto-exchange/login">Login to purchase</Link>
            </Button>
          )}
          <IconButton
            color="primary"
            component="span"
            sx={{ marginLeft: "auto" }}
            onClick={() => handleUpdateSingleCrypto(name)}
          >
            <RefreshIcon />
          </IconButton>
          <IconButton
            color="primary"
            component="span"
            sx={{ marginLeft: "0 !important" }}
            onClick={() => handleBookmark(name)}
          >
            {amBookmarked() ? <BookmarkAddedIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};
