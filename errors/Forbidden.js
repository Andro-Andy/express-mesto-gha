const { FORBIDDEN_ERROR } = require('../utils/constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.type = FORBIDDEN_ERROR;
  }
}

module.exports = Forbidden;
