import { AppBar, Grid, TextField, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const Appbar = ({ children }) => {
  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" />
          </Grid>
          <Grid item xs>
            <TextField
              placeholder="Search by email address, phone number, or user UID"
              InputProps={{
                disableUnderline: true,
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
