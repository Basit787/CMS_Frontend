import { AccountCircle, Dashboard } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SessionDetails from "../helpers/sessionDetails";
import useDialogBoxStore, { ActionType } from "../stores/DialogBoxStore";
import useHeadingStore from "../stores/HeadingStore";
import useLoginStore from "../stores/LoginStore";
import useSnackBarStore, { SnackbarType } from "../stores/SnacbarStore";
import DialogBox from "./Dialog";
import BadgeIcon from "@mui/icons-material/Badge";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }) {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { openDialog } = useDialogBoxStore((state) => state);
  const { logout } = useLoginStore((state) => state);
  const { openSnackbar } = useSnackBarStore((state) => state);
  const { heading, setHeading } = useHeadingStore((state) => state);

  const handleOpenDialog = () => {
    openDialog({
      title: "Do you want to logout!!!",
      message: "Do you really want to LogOut, if yes click agree",
      response: (actionType) => {
        if (actionType === ActionType.positive) {
          logout();
        }
        if (actionType === ActionType.negative) {
          openSnackbar({
            type: SnackbarType.error,
            message: "Failed to logout!!!",
          });
        }
      },
    });
  };

  const menuItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <Dashboard />,
    },
    {
      path: "/students",
      name: "Students",
      icon: <BadgeIcon />,
    },
    {
      path: "/course",
      name: "Courses",
      icon: <LibraryBooksIcon />,
    },
  ];

  const currentUser = JSON.parse(
    JSON.stringify(SessionDetails.getCurrentUser())
  );

  const renderUserDetails = (user) => (
    <Box>
      <p className="text-center font-bold">User Identity</p>
      <Divider />
      <Box className="m-2">
        {Object.entries(user).map(
          ([key, value]) =>
            key !== "token" && (
              <Typography
                key={key}
                variant="body2"
                className="flex flex-row w-full"
              >
                <Box className="w-1/2 text-sm md:text-lg break-words">
                  <b>{key.toUpperCase()}</b>
                </Box>
                <Box className="w-1/2 text-sm md:text-lg break-words">
                  {value}
                </Box>
              </Typography>
            )
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {dialogOpen && (
        <DialogBox close={(e) => setDialogOpen(e)} className="w-96">
          <Box className="w-full">{renderUserDetails(currentUser)}</Box>
        </DialogBox>
      )}
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {heading}
            </Typography>
          </Box>
          <Button
            variant="contained"
            className=" h-8 w-8 rounded-full"
            onClick={() => setDialogOpen(true)}
          >
            <AccountCircle className="text-sky-100" />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => setHeading(item.name)}
            >
              <ListItemButton component={NavLink} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List className="flex justify-end items-end">
          <ListItemButton onClick={handleOpenDialog}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </List>
      </Drawer>
      <Main
        open={open}
        sx={{ overflowY: "auto", height: "100vh", width: "100%" }}
      >
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
