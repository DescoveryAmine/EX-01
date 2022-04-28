const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require("cors");


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/api/home/all", (req, res) => {
  res.json({ message: "Hiring Web App Exercise" });
});

// routes
require('./routes/api/home')(app);
require('./routes/api/auth')(app);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
