const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

router.route('/register')
  .post(async (req, res) => {
    try {
      const { firstName, username, password } = req.body;
      const candidate = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (candidate) {
        throw new Error(`User ${username} is already exist`);
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          firstName,
          username,
          password: passwordHash,
        },
      });
      delete user.password;
      res.status(200).json(user);
    } catch (e) {
      res.status(409).json({ message: e.message });
    }
  });

module.exports = router;
