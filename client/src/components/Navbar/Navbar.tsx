import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useThemeContext } from "../../context/";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import {
  useAppDispatch,
  useAppSelector,
  removeUser,
  removeToken,
} from "../../features/";
import { NavbarWrapper } from "../styled/";

const justifyCenter = {
  justifyContent: "center",
};

export const Navbar = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const setTheme = useThemeContext();
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Manages which navigation options to show user based on current page.
  const { pathname } = useLocation();
  const [curLocation, setCurLocation] = useState<string>("");

  useEffect(() => {
    setCurLocation(pathname.replace("/crypto-exchange/", ""));
  }, [pathname]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleTheme = () => {
    setTheme.toggleSiteTheme();
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    dispatch(removeToken());
    dispatch(removeUser());
    handleCloseUserMenu();
  };

  return (
    <NavbarWrapper>
      <AppBar
        position="sticky"
        id="Navbar"
        sx={{
          maxHeight: "60px !important",
          overflow: "hidden",
          backgroundColor: "rgb(0,0,0)",
          borderBottom: theme.palette.mode === "dark" ? "solid white 1px" : "",
        }}
      >
        <Container maxWidth="xl" className="navbarContainer">
          <Toolbar disableGutters>
            {/* Website logo that links to welcome page. */}
            <Link to="crypto-exchange/" className="logoContainer">
              <img src={logo} alt="logo" className="logoImg" />
              <Typography className="title">CryptoExchange</Typography>
            </Link>

            <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
              {/* Profile Icon that triggers menu to open and populate options */}
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
                {/* Dynamically Rendered Navbar Options */}
                {user && (
                  <MenuItem onClick={handleCloseUserMenu} sx={justifyCenter}>
                    <Profile />
                  </MenuItem>
                )}

                {curLocation === "home" ? null : (
                  <Link to="/crypto-exchange/home">
                    <MenuItem onClick={handleCloseUserMenu} sx={justifyCenter}>
                      Browse Cryptos
                    </MenuItem>
                  </Link>
                )}

                {curLocation === "news" ? null : (
                  <Link to="/crypto-exchange/news">
                    <MenuItem onClick={handleCloseUserMenu} sx={justifyCenter}>
                      News
                    </MenuItem>
                  </Link>
                )}

                {curLocation === "" ? null : (
                  <Link to="/crypto-exchange/">
                    <MenuItem onClick={handleCloseUserMenu} sx={justifyCenter}>
                      About
                    </MenuItem>
                  </Link>
                )}

                {/* Buttons based on current log in status */}
                {curLocation === "login" ? null : user ? (
                  <MenuItem onClick={handleLogout} sx={justifyCenter}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                ) : (
                  <Link to="/crypto-exchange/login">
                    <MenuItem onClick={handleCloseUserMenu} sx={justifyCenter}>
                      Log In
                    </MenuItem>
                  </Link>
                )}

                {/* Theme Toggle */}
                <MenuItem onClick={toggleTheme} sx={justifyCenter}>
                  <IconButton sx={{ ml: 1 }} color="inherit">
                    {theme.palette.mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </NavbarWrapper>
  );
};
