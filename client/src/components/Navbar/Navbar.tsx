import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material/";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import { ProfileDrawer } from "./ProfileDrawer/ProfileDrawer";
import logo from "../../assets/logo.gif";

export const Navbar = () => {
  const { user, setUser, setToken } = useGlobalContext();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="sticky"
      className="Navbar"
      sx={{ height: "60px !important", backgroundColor: "black" }}
    >
      <Container maxWidth="xl" className="navbarContainer">
        <Toolbar disableGutters>
          <Link to="crypto-exchange/" className="logoContainer">
            <img src={logo} alt="logo" className="logoImg" />
            <Typography className="title">CryptoExchange</Typography>
          </Link>

          {/* Profile Icon with sub-menu */}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user?.username}
                  src={user?.profilePicture}
                  className="userAvatar"
                  sx={{
                    width: "35px",
                    height: "35px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/crypto-exchange/home">Browse Cryptos</Link>
              </MenuItem>
              {user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <ProfileDrawer />
                </MenuItem>
              ) : null}

              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/crypto-exchange/">About</Link>
              </MenuItem>

              {/* Buttons based on current log in status */}
              {user ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/crypto-exchange/login">Log In</Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
