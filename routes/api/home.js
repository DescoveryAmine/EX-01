const db = require("../../models");
const express = require('express');
const router = express.Router();
//const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// LoAd Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// LoAd User Model
const User = db.User;
const Inscription = db.Inscription;


// @route   GET api/home/register
// @desc    Register user
// @access  PublIc
router.post('/register', (req, res) => {
  
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
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(()=>{res.status(200).json({
    success: true,
    token: 'inscription faite '
  });})
  
  User.create({
    userId : req.body.userid,
    password : req.body.password
  })

  });
});
});

// @route   gEt api/users/login
// @desc    Login User / REturning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check PAssword
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.status(200).json({
          success: true,
          token: 'Bearer '
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});


module.exports = router;
