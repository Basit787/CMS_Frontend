import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Container,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Endpoints } from "../apis/apiContsants";
import instance from "../apis/apiRequest";
import { entry } from "../reducers/LoginSlice";
import "./Login.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}); //snackbar

const Login = () => {
  const [cred, setCred] = useState({
    email: "",
    password: "",
  });

  // snacbar................

  const [open, setOpen] = React.useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // dispatch
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCred((previousValue) => ({
      ...previousValue,
      [event.target.name]: event.target.value,
    }));
  };

  //login
  const handleClick = (event) => {
    event.preventDefault();
    instance
      .post(Endpoints.student_Login, {
        email: cred.email,
        password: cred.password,
      })
      .then((response) => {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        dispatch(entry(response.data.data));
      })
      .catch((error) => {
        console.log("login failed" + error);
        setOpen(true); //snacbar
      });
  };

  //password

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="main-div">
      <Container className="container">
        <form onSubmit={handleClick}>
          <FormControl
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="form_title">Log In</h2>
            <TextField
              label="email"
              variant="outlined"
              name="email"
              type="email"
              value={cred.email}
              placeholder="Enter your email-id"
              onChange={handleChange}
              className="input"
              sx={{ marginBottom: "20px", width: "350px", height: "60px" }}
              required
            />
            <FormControl
              required
              variant="outlined"
              className="input"
              sx={{ marginBottom: "20px", width: "350px", height: "60px" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={handleChange}
                name="password"
                value={cred.password}
              />
            </FormControl>
            <Button
              className="btn"
              // onClick={handleClick}
              type="submit"
              sx={{ color: "white", width: "40%", borderRadius: "30px" }}
            >
              LogIn
            </Button>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <Snackbar
                open={open}
                autoHideDuration={1000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Login failed!!!
                </Alert>
              </Snackbar>
            </Stack>
          </FormControl>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
