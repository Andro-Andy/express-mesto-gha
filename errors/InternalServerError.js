const { SERVER_ERROR } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.type = SERVER_ERROR;
  }
}

module.exports = InternalServerError;
