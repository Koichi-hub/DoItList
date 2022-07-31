const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = [
  morgan('dev'),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
];
