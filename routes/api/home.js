const db = require("../../models");
const express = require('express');
const router = express.Router();
const app = express();
//const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// LoAd Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// LoAd User and Inscription Model
const User = db.User;
const Inscription = db.Inscription;

module.exports = function(app) {

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public

/*router.get('/all', (req, res) => res.json({ msg: 'all  Works' }));
router.get('/user', (req, res) => res.json({ msg: 'User Works' }));
router.get('/mod', (req, res) => res.json({ msg: 'mod Works' }));
router.get('/admin', (req, res) => res.json({ msg: 'admin Works' }));
*/
// @route   GET api/home/register
// @desc    Register user
// @access  PublIc
app.post('/register', (req, res) => {
  
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check ValidatioN
  if (!isValid) {
    return res.status(400).json(errors);
  }
 // Username
 Inscription.findOne({
  where: {
    email: req.body.email
  }
}).then(inscription => {
  if (inscription) {
    res.status(400).send({
      message: "Failed! Email is already in use!"
      
    });
    return;
  }
  // Email
  Inscription.findOne({
    where: {
      userId: req.body.userid
    }
  }).then(inscription => {
    if (inscription) {
      res.status(400).send({
        message: "Failed! UserId is already in use!"
      });
      return;
    }
  // Save User to Database and respand with success !
  Inscription.create({
    inscriptionId : uuidv4(),
    userId : req.body.userid, 
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
  }).then(()=>{

    User.create({
      userId : req.body.userid,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    res.status(200).json({message: "User registered successfully!"})
     ;})
  });
});
});

// @route   gEt api/users/login
// @desc    Login User / REturning JWT Token
// @access  Public
app.post('/api/home/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(408).json(errors);
  }

  // Find user by userid
  User.findOne({
    where: {
      userId: req.body.userid
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (!isMatch) {
          Inscription.findOne({
            where: {
              userId: req.body.userid
            }
          }).then(inscription => {
            if (inscription) {
              res.status(200).send({
                userId : inscription.userId, 
                name: inscription.name,
                lastname: inscription.lastname,
                email: inscription.email,
                validated: inscription.validated,
                bearer_token: inscription.bearer_token,
                validation_date: inscription.validation_date,
              });
              return;
            } 
        });}
        else {
          errors.password = 'Password incorrect oops';
          return res.status(407).json(errors);
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
})
}
