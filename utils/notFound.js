const NotFoundError = require('../errors/NotFoundError');

module.exports.errorNotFound = (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
};
