const express = require('express');
const register = require('./register');
const login = require('./login');
const test = require('./test');

const router = express.Router();

const routes = [
  register,
  login,
  test,
];

router.use('/api', routes);

module.exports = router;
