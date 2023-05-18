import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress
} from "@mui/material";
import { useSelector } from "react-redux";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  //REDUX TOOLKIT
  const isLogin = useSelector((state) => state.logins.isLogin);

  useEffect(() => {
    const getImageData = async () => {
      //getting all the image IDS
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:3000/imageData", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);

        //creating the urls from the IDS
        const mapdata = data.map((item) => {
          return {
            id: item._id,
            title: item.name,
            url: `http://127.0.0.1:3000/image/${item._id}`,
          };
        });
        //SUCESSFULLY RETERVIAL OF IMAGE IDS
        setIsLoading(false);
        setImages(mapdata);
      } catch (error) {
        setIsLoading(false);
        setError("Something went Wrong!!");
      }
    };
    getImageData();
  }, []);

  //FOR CORS error when FETCHING IMAGE FROM SERVER
  const options = {
    crossOrigin: "anonymous",
  };

  //WHEN TRYING TO FETCH THE PAGE WITHOUT LOGIN IN
  if (isLogin === false) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Typography variant="h6" gutterBottom>
            LOGIN OR SIGNUP FIRST
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h3" gutterBottom>
          Image Gallery{isLoading && <CircularProgress />}
        </Typography>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        {images.length === 0 ? (
          <Typography variant="body1">No images uploaded yet.</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {images.map((image) => (
              <Card key={image.id}>
                <CardMedia
                  component="img"
                  image={image.url}
                  options={options}
                  alt={image.title}
                />
                <CardContent>
                  <Typography variant="subtitle1">{image.title}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ImageGallery;
