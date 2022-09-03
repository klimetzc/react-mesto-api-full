const jsonwebtoken = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const { jwtSecretKey } = require('../utils/constants');
const { UnauthorizedError } = require('../utils/Errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  const { authorization } = req.headers;

  // if (!jwt) {
  //   console.log('cookies: ', req.cookies);
  //   next(new UnauthorizedError(`Необходима авторизация tut`));
  // }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  console.log('jwt token: ', authorization);
  let payload;

  try {
    payload = jsonwebtoken.verify(token, NODE_ENV === 'production'? JWT_SECRET : 'secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
