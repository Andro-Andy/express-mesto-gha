const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" обязательна к заполнению'],
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    link: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "link" обязательна к заполнению'],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// Модель карточки
const Card = mongoose.model('card', cardSchema);

module.exports = Card;
