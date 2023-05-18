# ANKITPATEL-dobby

### How to RUN ### 
    1. clone the repository
    2. It will have two folders frontend and backend

### RUN BACKEND SERVER ###
    1. go into the backend folder in terminal
    2. run the command "npm install"
    3. create the .env file in the backend with parameters (MONGODB_PASSWORD,JWT_SECRET_KEY)
    4. then run "npm start" 
    5. Backend server started at "http://localhost:3000"

### RUN FRONTEND RUN ###
    1. go into the frontend folder in terminal
    2. run the command "npm install"
    3. then run "npm start" 
    5. FRONTEND started at "http://localhost:3001"

### AUTHENTICATION ###
I have a implemented AUTHENTICATION using JWT token  which is created when the client LOGIN's or SIGNUP into the website and set as a cookie

In order to fetch or search images you need to login first

### IMAGES ###
for uploading the images into the mongodb server we have used the multer memorystorage which converts the images to a buffer data in memory than uploads it into the database and once uploaded it removes the image from the server's memory

Each user can see only his/her images which are uploaded to the database 

And to reterive the images you need the ID for that image

SEARCHING OF IMAGES: this is done by doing a regex search in mongodb database on the name of the image
