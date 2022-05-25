import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useUserContext } from "../../hooks/useUserContext";
import logo from "../../data/crypto.png";
import { Link } from "react-router-dom";
import { ProfileDrawer } from "./ProfileDrawer/ProfileDrawer";

export const Navbar = () => {
  const { user, setUser, setToken } = useUserContext();
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
  };

  return (
    <AppBar position="sticky" className="Navbar">
      <Container maxWidth="xl" className="navbarContainer">
        <Toolbar disableGutters>
          <Avatar alt="logo" src={logo} sx={{ mr: 2 }} />

          {/* Profile Icon with sub-menu */}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.username} src="./" className="userAvatar" />
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
              {user ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <ProfileDrawer />
                </MenuItem>
              ) : null}

              {/* Buttons based on current log in status */}
              {user ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              ) : (
                <MenuItem>
                  <Link to="/login">Log In</Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
