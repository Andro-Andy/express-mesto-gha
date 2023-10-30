const { CODE_ERROR } = require('../utils/constants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.type = CODE_ERROR;
  }
}

module.exports = BadRequest;
