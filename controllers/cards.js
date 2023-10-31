const Forbidden = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const {
  CODE,
  CODE_CREATED,
  NOT_FOUND_ERROR,
} = require('../utils/constants');

const checkCard = (card, res, next) => {
  if (card) {
    return res.send({ data: card });
  }
  const error = new NotFoundError(`Карточка с указанным _id не найдена ${NOT_FOUND_ERROR}`);
  return next(error);
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((card) => {
      res.status(CODE).send({ data: card });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CODE_CREATED).send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const _id = req.params.cardId;
  Card.findOne({ _id })
    .populate({ path: 'owner', model: 'user' })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка была удалена');
      }
      if (card.owner._id.toString() !== req.user._id.toString()) {
        throw new Forbidden('Вы не можете удалить карточку другого пользователя');
      }
      return Card.findByIdAndDelete(_id);
    })
    .then((cardDeleted) => {
      res.send({ data: cardDeleted });
    })
    .catch(next);
};

const updateLikes = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .populate([
      { path: 'owner', model: 'user' },
      { path: 'likes', model: 'user' },
    ])
    .then((user) => checkCard(user, res))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const newData = { $addToSet: { likes: req.user._id } };
  updateLikes(req, res, newData, next);
};

const dislikeCard = (req, res, next) => {
  const newData = { $pull: { likes: req.user._id } };
  updateLikes(req, res, newData, next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
