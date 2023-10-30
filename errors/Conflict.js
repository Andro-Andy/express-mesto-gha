const { CONFLICT_ERROR } = require('../utils/constants');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.type = CONFLICT_ERROR;
  }
}

module.exports = Conflict;
