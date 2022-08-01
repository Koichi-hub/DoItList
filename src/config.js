const log4js = require('log4js');

const { env } = process;

const {
  HOST,
  PORT,
  LOG_LEVEL,
  ACCESS_TOKEN_SECRET,
} = env;

const logger = log4js.getLogger();
logger.level = LOG_LEVEL;

module.exports = {
  HOST,
  PORT,
  ACCESS_TOKEN_SECRET,
  logger,
};
