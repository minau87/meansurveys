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

// Log to console when DB connection was established successfully
mongoose.connection.on('connected', () => {
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

// Log to console when when connecting to DB caused an error
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

// Importing routes (API endpoints)
const userRouter = require('./routes/user.endpoints');
const surveyRouter = require('./routes/survey.endpoints');
const authRouter = require('./routes/authentication.endpoints');

// Adding the CORS middleware
app.use(cors());

// Adding the Body Parser middleware
app.use(bodyParser.json());

// Adding the Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Declaring the port we're using
const port = process.env.PORT || 3000;

// Specify the default route for our app
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Using the routes specified above
app.use('/api/users', userRouter);
app.use('/api/surveys', surveyRouter);
app.use('/auth', authRouter);

// Declare what we serve when a route is adressed we didn't specify
app.use('*', (req, res) => {
  res.send('Invalid Endpoint!');
});

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