const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./auth')(passport);

module.exports = [
  morgan('dev'),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  passport.initialize(),
];
