const express = require('express');
const register = require('./register');
const login = require('./login');

const router = express.Router();

const routes = [
  register,
  login,
];

router.use('/api', routes);

module.exports = router;
