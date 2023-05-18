import React, {  useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    CircularProgress
} from "@mui/material";
import { useSelector } from "react-redux";

const SearchImage = () => {
    const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  //REDUX TOOLKIT
  const isLogin = useSelector((state) => state.logins.isLogin);

  const handleSearch = async () => {
    if(searchTerm.trim().length===0){
        setError("Enter Something to SEARCH");
        return;
    }
    try{
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:3000/imageSearch/${searchTerm}`, {
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
        setError("");
        setIsLoading(false);
        setImages(mapdata);
    }
    catch(error){
        setIsLoading(false);
        setError("Something went Wrong!!");
    }
  };

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
    <Container maxWidth="md" >
    <div style={{"marginTop":"50px"}}>
      <TextField
        label="Search for an image"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Typography variant="body1" color="error">
          {error}
    </Typography>
      {isLoading && <CircularProgress />}
      {images.length === 0 ? (
          <Typography variant="body1">NO IMAGES FOUND or NO SEARCH MADE</Typography>
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
    </div>
    </Container>
  );
};

export default SearchImage;
