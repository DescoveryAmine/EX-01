const express = require('express');
const router = express.Router();
const db = require("../../models");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// LoAd Input Validation

const validateSubmitInscription = require('../../validation/inscription');
const validateLoginInput = require('../../validation/login');

// LoAd User and Inscription Model
const User = db.User;
const Inscription = db.Inscription;


// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
<<<<<<< Updated upstream
<<<<<<< Updated upstream
router.get('/getauth', (req, res) => {
=======
module.exports = function(app) {

app.get('/validate', (req, res) => {
>>>>>>> Stashed changes
=======
module.exports = function(app) {

app.get('/validate', (req, res) => {
>>>>>>> Stashed changes
        // user Matched
        const payload = { id: User.id, name: User.name }; // Create JWT Payload

        // Sign Token requIred
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 60 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );

});

router.post('/validate', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Inscription.findOne({
    where: {
      userId: req.body.userid
    }
  }).then(inscription => {
    let isInscription = inscription.validated
    if (!isInscription) {

      inscription.update(
        { validated: true},
        { where: { userId: req.body.userid} }
      )
        .then(result =>
          console.log(result)
        )
        .catch(err =>
          console.log(err)
        )
      res.status(200).send({
        message: "success! inscription is validated"
      });
      return;
    }
    else {
      res.status(200).send({
        message: "Failed! inscription already validated!"
      });
    }
  });
});

// @route   GET api/users/curreNt
// @desc    Return current user
// @access  PrivatE
/*router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);*/

}
