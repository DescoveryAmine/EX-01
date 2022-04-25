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
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
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
        if (isMatch) {
          Inscription.findOne({
            where: {
              userId: req.body.userid
            }
          }).then(inscription => {
            if (inscription) {
              res.status(200).send({
                userId : inscription.userid, 
                name: inscription.name,
                lastname: inscription.lastname,
                email: inscription.email,
              });
              return;
            } 
        });}
        else {
          errors.password = 'Password incorrect oops';
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
})

module.exports = router;
