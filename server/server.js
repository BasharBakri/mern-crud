const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const users = require(path.join(__dirname, 'routes', 'users.js'));
const logger = require(path.join(__dirname, 'middleware', 'logger.js'));

// load env variables


dotenv.config({ path: path.join(__dirname, '/config/config.env') });

const app = express();

app.use(logger);

app.use('/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(PORT, process.env.NODE_ENV));