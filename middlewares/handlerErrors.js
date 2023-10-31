const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error;
const {
  CODE_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  SERVER_ERROR,
} = require('../utils/constants');
const Unauthorized = require('../errors/Unauthorized');
const NotFound = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');

module.exports = (err, req, res) => {
  let status = SERVER_ERROR;
  let message = 'На сервере произошла ошибка';

  if (err instanceof CastError || err instanceof ValidationError) {
    status = CODE_ERROR;
    message = `Переданы некорректные данные ${CODE_ERROR}`;
  } else if (err instanceof DocumentNotFoundError) {
    status = NOT_FOUND_ERROR;
    message = `Пользователь с указанным _id не найден ${NOT_FOUND_ERROR}`;
  } else if (err instanceof NotFound || err instanceof Unauthorized || err instanceof Forbidden) {
    status = err.type;
    message = err.message;
  } else if (err.code === 11000) {
    status = CONFLICT_ERROR;
    message = 'Адрес электронной почты уже зарегистрирован';
  }

  res.status(status).send({ message });
};
