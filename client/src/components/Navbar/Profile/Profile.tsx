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
import { CryptoWallet } from "./CryptoWallet";
import {
  formatPrice,
  calculatePortfolioValue,
  calculateTotalValue,
  calculateTotalInvestmentReturn,
  numberWithCommas,
} from "../../../utilities/helpers";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { UpdateNameForm, UpdateProfileImageForm } from "../../forms/";
import { useAppSelector } from "../../../features/";
import { ProfileDrawerWrapper } from "../../styled/";

type Anchor = "top" | "left" | "bottom" | "right";

export const Profile = () => {
  const cryptos = useAppSelector((state) => state.cryptos.value);
  const user = useAppSelector((state) => state.user.value);

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

  // Component that will display all the users profile contents such as user name, balance, and investments.
  const list = (anchor: Anchor) => (
    <ProfileDrawerWrapper>
      <Box
        className="ProfileBox"
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 300 }}
        role="presentation"
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
            <UpdateProfileImageForm
              currentProfilePicture={user ? user.profilePicture : ""}
            />

            <div>
              Hello, <UpdateNameForm name={user ? user.fullName : ""} />
            </div>
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
                <p>${numberWithCommas(accountTotalValue)}</p>
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
                Crypto: $
                {user &&
                  numberWithCommas(
                    calculatePortfolioValue(user?.portfolio, cryptos)
                  )}
              </p>
              <p>
                <ArrowRightIcon />
                Cash: ${user && numberWithCommas(formatPrice(user?.balance))}
              </p>
            </div>
          </CardContent>

          {/* Section: Breakdown of users investments - with option to sell when expanded. */}
          <div className="walletIcon" style={{ marginBottom: "10px" }}>
            <Chip
              label="My Wallet"
              icon={<AccountBalanceWalletIcon fontSize="small" />}
            />
          </div>
          <CryptoWallet />
        </Card>
      </Box>
    </ProfileDrawerWrapper>
  );

  return (
    <div className="profileButton" style={{ width: "100%" }}>
      {/* Navbar option button, that will trigger profile section to popup. */}
      <Typography
        onClick={toggleDrawer("right", true)}
        sx={{ padding: "6px 16px", textAlign: "center" }}
      >
        Profile
      </Typography>

      {/* Profile information that will display once triggered by user. */}
      <Drawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
};
