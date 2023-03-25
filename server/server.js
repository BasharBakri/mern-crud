const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');


// load env variables

dotenv.config({ path: path.join(__dirname, '/config/config.env') });


// connect to db

connectDB();



const users = require(path.join(__dirname, 'routes', 'users.js'));
const logger = require(path.join(__dirname, 'middleware', 'logger.js'));







const app = express();

// cors for vite local host
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  next();
});


// body parser middle wear 
app.use(express.json());

app.use(logger);




app.use('/users', users);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(PORT));



// Unhandeled Promise rejections: 


process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // under will close the server if you don't connect to monogdb
  server.close(() => process.exit(1));
});