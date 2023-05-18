import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [cookies] = useCookies(['jwt']); // Replace 'yourCookieName' with the actual name of your cookie

  const checkCookie = () => {
    if (cookies.yourCookieName) {
      // Cookie is set
      console.log('Cookie exists');
    } else {
      // Cookie is not set
      console.log('Cookie does not exist');
    }
  };

  checkCookie();
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Welcome to Your Website
        </Typography>
        <Typography variant="body1" align="center">
          This website has multiple pages 
          <ul>
            <li>Home   =: <i>"/"</i></li>
            <li>Login  =: <i>"/login"</i></li>
            <li>SignUp =: <i>"/signup"</i></li>
            <li>LOGIN REQUIRED FOR BELOW PAGES</li>
            <li>Image Upload =: <i>"/uploadform"</i></li>
            <li>Gallery =: <i>"/imageGallery"</i></li>
          </ul>
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
