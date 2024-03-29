const { Joi, celebrate } = require('celebrate');
const { REGEX } = require('../utils/constants');

// Валидация ID карточки
const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required().hex(),
  }),
});

// Валидация данных карточки
const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(REGEX),
  }),
});

module.exports = {
  validateCardId,
  validateCard,
};
