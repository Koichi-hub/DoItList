const express = require('express');
const register = require('./register');

const router = express.Router();

const routes = [
  register,
];

router.use('/api', routes);

module.exports = router;
