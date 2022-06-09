import React from "react";
import {
  Box,
  Drawer,
  Card,
  CardContent,
  Avatar,
  Chip,
  Typography,
} from "@mui/material/";
import { useGlobalContext } from "../../../hooks/useGlobalContext";
import { CryptoWallet } from "./CryptoWallet";
import {
  formatPrice,
  capitalizeFirstLetter,
  calculatePortfolioValue,
  calculateTotalValue,
  calculateTotalInvestmentReturn,
} from "../../../assets/helpers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type Anchor = "top" | "left" | "bottom" | "right";

export const ProfileDrawer = () => {
  const { user, cryptos } = useGlobalContext();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  let accountTotalValue = user
    ? calculateTotalValue(user.portfolio, cryptos, user.balance)
    : 0;
  let totalInvestmentReturn = calculateTotalInvestmentReturn(
    accountTotalValue,
    user ? user.deposits : []
  );

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      className="ProfileBox"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Card variant="outlined">
        {/* Section: User profile image and name. */}
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "solid black 1px",
          }}
        >
          <Avatar
            sx={{ border: "solid black 1px" }}
            aria-label="recipe"
            alt={user?.profilePicture}
            src={user?.profilePicture}
          />

          <Typography>
            Hello, {user ? capitalizeFirstLetter(user.fullName) : "loading..."}
          </Typography>
        </CardContent>

        {/* Section: Information on users account value and performance, cash balance, and crypto balance.*/}
        <CardContent className="portfolioSummary" sx={{ padding: "0 16px" }}>
          <div className="portfolioDetails">
            <Avatar
              sx={{ border: "solid black 1px", backgroundColor: "black" }}
              aria-label="balance"
            >
              <CurrencyExchangeIcon />
            </Avatar>
            <div className="balance">
              <p className="valueTitle">Total Portfolio Value</p>
              <p>${accountTotalValue}</p>
            </div>
            <Chip
              sx={{ paddingLeft: "2px" }}
              color={totalInvestmentReturn >= 0 ? "success" : "error"}
              variant="outlined"
              size="small"
              label={`${totalInvestmentReturn}%`}
              icon={
                totalInvestmentReturn >= 0 ? (
                  <ArrowCircleUpIcon />
                ) : (
                  <ArrowCircleDownIcon />
                )
              }
            />
          </div>

          <div className="portfolioBreakdown">
            <p>
              <ArrowRightIcon />
              Cash: ${user && formatPrice(user?.balance)}
            </p>
            <p>
              <ArrowRightIcon />
              Crypto: $
              {user && calculatePortfolioValue(user?.portfolio, cryptos)}
            </p>
          </div>
        </CardContent>

        {/* Section: Breakdown of users investments - with option to sell when expanded. */}
        <div className="walletIcon">
          <Chip
            label="My Wallet"
            icon={<AccountBalanceWalletIcon fontSize="small" />}
          />
        </div>
        <CryptoWallet />
      </Card>
    </Box>
  );

  return (
    <div className="profileButton">
      <Typography onClick={toggleDrawer("right", true)}>Profile</Typography>
      <Drawer
        className="ProfileDrawer"
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
};
