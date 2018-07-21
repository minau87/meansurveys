// Import required modules
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");

// Initialize the app variable with express
const app = express();

// Port we're using
const port = process.env.PORT || 3000;

// Specify the default route for our app
app.get('/', (req, res) => {
  res.send('Invalid Endpoint')
})

// Listen on the specified port above
app.listen(port, () => {
  console.log(
    `
    *******************************************\n
    \x1b[0;32mMEANSurveys:\x1b[0m\n
    Server started and running on port ${port}.\n
    Press Ctrl+C to stop the server.\n
    *******************************************
    `
  );
});