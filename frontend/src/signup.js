import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { loginActions } from "./store/loginStore";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  //REDUX TOOLKIT
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Form Submittion
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //CHECKING VARAIBLES BEFORE REQUEST IS MADE
      if (
        email.trim().length === 0 ||
        password.trim().length === 0 ||
        rePassword.trim().length === 0
      ) {
        setError("please Enter valid input in all the fields");
        return;
      }
      if (password.trim().length < 6) {
        setError("password should be more than 6 characters");
        return;
      }
      if (password !== rePassword) {
        setError("passwords do not match");
        return;
      }
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:3000/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok && response.status === 201) {
        const data = await response.json();
        setIsLoading(false);

        //CHECKING ERROR MESSAGE FROM SERVER
        if (data.email) {
          setError(data.email);
          return;
        }
        if (data.password) {
          setError(data.password);
          return;
        }
      } else {
        throw Error("Error");
      }
      //SUCESSFUL SUBMITTION OF FORM
      dispatch(loginActions.settrueLogin())
      navigate('/');
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong");
      return;
    }
    
  };

  return (
    <Container maxWidth="sm">
      <h1>Signup</h1>
      {isLoading && <CircularProgress />}
      <Typography variant="body1" color="error">
        {error}
      </Typography>
      <Box sx={{ mt: 8 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            label="Re-enter Password"
            type="password"
            fullWidth
            margin="normal"
            value={rePassword}
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
