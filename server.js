const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const home = require('./routes/api/home');
const auth = require('./routes/api/auth');



const app = express();

// A-Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// UsE Routes
app.use('/api/home', home);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
