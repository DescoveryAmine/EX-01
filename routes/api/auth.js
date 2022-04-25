const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/validate', (req, res) => {
        // user Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token requIred
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );

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

module.exports = router;
