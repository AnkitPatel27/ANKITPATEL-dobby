import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Button,
  Input,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  //REDUX TOOLKIT
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.logins.isLogin);

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

  //INPUT HANDLER FOR FILE
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  //FILE UPLOADING TO THE SERVER
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    //CHECKING BEFORE SUBMITTING
    if (selectedFile === null) {
      setError("Please upload any Photo");
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await fetch("http://127.0.0.1:3000/uploadImage", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (response.ok && response.status === 201) {
        //SUCESSFUL SUBMITTION OF FORM
        setIsLoading(false);
        navigate("/imageGallery");
      } else {
        throw Error("Error");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went Wrong!!");
    }
    if (selectedFile) {
      // Perform file upload logic
      console.log("File:", selectedFile);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          File Upload {isLoading && <CircularProgress />}
        </Typography>
        <Typography variant="body1" color="error">
          {error}
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="file-upload" shrink>
              Select File (.jpg, .jpeg, .png)
            </InputLabel>
            <Input
              id="file-upload"
              type="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>
            Upload
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default FileUploadForm;
