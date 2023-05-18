import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import {useDispatch, useSelector } from "react-redux";
import { loginActions } from "./store/loginStore";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.logins.isLogin)
  const navigate = useNavigate();

  //CHANGE THE ISLOGIN STATE OF REDUX STORE TO FALSE
  const logoutHandler = () =>{
    dispatch(loginActions.setfalseLogin())
    navigate('/');
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dobby Ads Assignment
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button component={Link} to="/" color="inherit" sx={{ mr: 1 }}>
              Home
            </Button>
            {!isLogin && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </>
            )}
            {isLogin && (
              <>
                <Button
                  component={Link}
                  to="/uploadform"
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  Upload
                </Button>
                <Button component={Link} to="/imageGallery" color="inherit">
                  Images
                </Button>
                <Button component={Link} to="/searchImage" color="inherit">
                  SearchImage
                </Button>
                <Button onClick={logoutHandler} color="inherit">
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet/>
    </>
  );
};

export default Navbar;
