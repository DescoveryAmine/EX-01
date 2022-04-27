const express = require('express');
const app = express();
const db = require("../../models");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// LoAd Input Validation

const validateSubmitInscription = require('../../validation/inscription');


// LoAd User and Inscription Model
const User = db.User;
const Inscription = db.Inscription;


// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public

module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

app.post('/api/auth/getauth', (req, res) => {
        // user Matched
        const { errors, isValid } = validateSubmitInscription(req.body);
        // create payload
        const payload = { id: User.id, name: User.name }; 

        // Check Validation
        if (!isValid) {
          return res.status(410).json(errors);
        }
        Inscription.findOne({
          where: {
            userId: req.body.userid
          }
        }).then(inscription => {
          let isValidated = inscription.validated
          if (isValidated) {
            // Sign Token requIred
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 60 },
              (err, token) => {
                inscription
                .update({ bearer_token: token},
                  { where: { userId: req.body.userid} })
                .then(res.status(200).send({
                  message: "success! Authorization is updated"
                }))
                .catch(err =>
                    console.log(err))
              }
            );
          }
          else {
            res.status(200).send({
              message: "OOPs! Authorization can't be done before validation!"
            });
          }
        });

});

app.post('/api/auth/validate', (req, res) => {

  const { errors, isValid } = validateSubmitInscription(req.body);
 
  // Check Validation
  if (!isValid) {
    return res.status(410).json(errors);
  }
  Inscription.findOne({
    where: {
      userId: req.body.userid
    }
  }).then(inscription => {
    let isInscription = inscription.validated
    if (!isInscription) {

      inscription.update(
        { validated: true , validation_date : Date.now()},
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
