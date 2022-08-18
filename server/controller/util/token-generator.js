require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateToken: async (user, keepLoggedin) => {
    const payload = {
      id: user.id,
      email: user.email,
    };
    let result = {
      accessToken: sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "30m",
      }),
    };

    if (keepLoggedin) {
      result.refreshToken = sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: "1h",
      });
    }

    return result;
  },
  verifyToken: async (type, token) => {
    let secretKey, decoded;

    switch (type) {
      case 'access':
        secretKey = process.env.ACCESS_SECRET;
        break;
      case 'refresh':
        secretKey = process.env.REFRESH_SECRET;
        break;
      default:
        return null;
    }

    try {
      decoded = await verify(token, secretKey);
    } catch (err) {
      return { data: null, err: err.message };
    }
    return { data: decoded };
  },
};