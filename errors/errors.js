const VALIDATION_ERROR = 400;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const SERVER_ERROR = 500;
const handleError = (res) => {
  res.status(SERVER_ERROR).send({ message: 'Ошибка сервера' });
};
const errorNotFound = (res) => {
  res
    .status(NOT_FOUND_ERROR)
    .send({ message: 'Cтраница не найдена' });
};

module.exports = {
  VALIDATION_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  handleError,
  errorNotFound,
};
