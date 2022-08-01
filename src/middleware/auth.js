const { Strategy, ExtractJwt } = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const { ACCESS_TOKEN_SECRET, logger } = require('../config');

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(new Strategy(options, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.userId,
        },
      });

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (e) {
      logger.log(e);
    }
  }));
};
