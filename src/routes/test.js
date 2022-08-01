const express = require('express');
const passport = require('passport');

const router = express.Router();

router.route('/users')
  .all(passport.authenticate('jwt', { session: false }))
  .get(async (req, res) => {
    res.json(req.user);
  });

module.exports = router;
