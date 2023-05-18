import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginActions } from "./store/loginStore";
import {useDispatch} from "react-redux"


const Login = () => {
  //states
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  //REDUX TOOLKIT
  const dispatch = useDispatch();




  //FORM Submittion 
  const cookies = document.cookie;
  console.log(cookies);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      //CHECKING BEFORE SUBMITTING
      if (email.trim().length === 0 || password.trim().length === 0) {
        setError("please Enter valid input in all the fields");
        return;
      }
      //CHECKING BEFORE SUBMITTING
      if (password.trim().length < 6) {
        setError("password should be more than 6 characters");
        return;
      }
      
      setIsLoading(true);
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok && response.status === 201) {
        const data = await response.json();
        // console.log("login response data : ", data);
        setIsLoading(false);
        if (data.message!=="success") {
          setError(data.message);
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
      <h1>Login</h1>
      {isLoading && <CircularProgress />}
      <Typography variant="body1" color="error">
        {error}
      </Typography>
      <Box sx={{ mt: 8 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="email"
            fullWidth
            margin="normal"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
