const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require("cors");
const home = require('./routes/api/home');
const auth = require('./routes/api/auth');



const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// Connect to MongoDB
/*mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
*/
// Passport middleware
app.use(passport.initialize());

// Passport CoNfig
require('./config/passport')(passport);

// simple route
app.get("/api/home/all", (req, res) => {
  res.json({ message: "Hiring Web App Exercise" });
});

// routes
require('./routes/api/home')(app);
require('./routes/api/auth')(app);

// UsE Routes
//app.use('/api/home', home);
//app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
