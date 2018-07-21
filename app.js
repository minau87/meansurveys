// Import required modules
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const dbconfig = require('./config/database');

// Initialize the app variable with express
const app = express();

// Connect to MongoDB
mongoose.connect(dbconfig.mongouri);

// On DB connection
mongoose.connection.on('connected', () => {
  // Log to console when connection was established successfully.
  console.log(
    `
*******************************************\n
\x1b[1;32mDatabase connection established:\x1b[0m\n
Connection from Node-app to database at\n
\x1b[4;33m${dbconfig.mongouri}\x1b[0m\n
has been established.
\n
*******************************************
    `
  );
});

// On DB error
mongoose.connection.on('error', (err) =>{
  console.log(
    `
*******************************************\n
\x1b[1;31mDatabase error:\x1b[0m\n
${err}
\n
*******************************************
    `
  );
});

// Setting the folder for static files (the Angular app)
app.use(express.static(path.join(__dirname, 'client')));

// Importing routes
const users = require('./routes/users');
const surveys = require('./routes/surveys');
const authentication = require('./routes/authentication');

// Adding the CORS middleware
app.use(cors());

// Body Parser middleware
app.use(bodyParser.json());

// Port we're using
const port = process.env.PORT || 3000;

// Specify the default route for our app
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Using the routes specified above
app.use('/api/users', users);
app.use('/api/surveys', surveys);
app.use('/auth', authentication);

app.use('*', (req, res) => {
  res.send('Invalid Endpoint!');
});

// Catch any other route that's not specified above

// Listen on the specified port above
app.listen(port, () => {
  console.log(
    `
*******************************************\n
\x1b[1;32mMEANSurveys:\x1b[0m\n
Server started and running on port ${port}.\n
Press Ctrl+C to stop the server.\n
*******************************************
    `
  );
});

// Next, create user model and register