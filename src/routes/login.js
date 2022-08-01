const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { ACCESS_TOKEN_SECRET } = require('../config');

const prisma = new PrismaClient();
const router = express.Router();

const generateAccessToken = (id) => {
  const payload = {
    userId: id,
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
};

router.route('/login')
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!user) {
        const e = new Error('User does not exist');
        e.name = 'UserError';
        throw e;
      }
      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) {
        const e = new Error('Password error');
        e.name = 'PasswordError';
        throw e;
      }
      const token = generateAccessToken(user.id);
      res.status(200).json({ token });
    } catch (e) {
      if (e.name === 'UserError') {
        res.status(404).json({ message: e.message });
      } else if (e.name === 'PasswordError') {
        res.status(400).json({ message: e.message });
      }
    }
  });

module.exports = router;
