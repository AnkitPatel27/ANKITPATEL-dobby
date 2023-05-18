const express = require('express');
const mongoose = require('mongoose');
const authRouters = require('./routers/authRouters');
const imageRouters = require('./routers/imageRouters');
const cookieParser = require('cookie-parser');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');
const cors = require('cors');
require("dotenv").config();

const app = express();

//CORS
app.use(cors({
   origin:"http://localhost:3001",
   credentials:true
}))

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// database connection
const dbURI = `mongodb+srv://ankit_git:${process.env.MONGODB_PASSWORD}@cluster0.mhfgtgs.mongodb.net/node-auth?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    app.listen(3000)})
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.use(authRouters);
app.use(imageRouters);
