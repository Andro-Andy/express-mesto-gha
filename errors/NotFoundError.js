const { NOT_FOUND_ERROR } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.type = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
