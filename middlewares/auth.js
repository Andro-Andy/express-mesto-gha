const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const Unauthorized = require('../errors/Unauthorized');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const unauthorizedMessage = 'Необходимо пройти авторизацию';

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(unauthorizedMessage));
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
    return next();
  } catch (err) {
    return next(new Unauthorized(unauthorizedMessage));
  }
};
