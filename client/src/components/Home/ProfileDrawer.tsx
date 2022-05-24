import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Avatar, Chip, Typography } from "@mui/material";
import { useUserContext } from "../../hooks/useUserContext";

type Anchor = "top" | "left" | "bottom" | "right";

export const ProfileDrawer = () => {
  const { user } = useUserContext();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            sx={{ border: "solid black 1px" }}
            aria-label="recipe"
            alt={user?.username}
            src="./"
          />

          <Typography>
            <Chip
              sx={{ marginLeft: "auto" }}
              label={user?.balance}
              color="success"
              icon={<AttachMoneyIcon fontSize="small" />}
            />
          </Typography>
        </CardContent>
        <CardContent sx={{ padding: "0 16px" }}>
          Hello, {user?.username}
        </CardContent>
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
