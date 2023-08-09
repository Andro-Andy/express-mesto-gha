const {
  handleError,
  VALIDATION_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
} = require('../errors/errors');
const Card = require('../models/card');

const getCards = async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    const cards = await Card.find({})
      .skip(skip)
      .limit(limit);

    res.status(200).send({
      cards,
    });
  } catch (error) {
    handleError(error, res);
  }
  return null;
};

const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const cardData = { name, link, owner: req.user._id };
    const card = await Card.create(cardData);
    res.status(201).send(card);
  } catch (err) {
    if (err.codeName === 'ValidationError') {
      return res
        .status(VALIDATION_ERROR)
        .send({ message: 'Карточка с таким именем уже существует, выберите другое' });
    }
    handleError(err, res);
  }
  return null;
};

const deleteCards = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = await Card.findById(cardId);
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Карточка не найдена' });
    }

    if (card.owner.toString() !== userId) {
      return res
        .status(FORBIDDEN_ERROR)
        .send({ message: 'У вас нет доступа для удаления этой карточки' });
    }

    const deletedElement = await Card.findByIdAndRemove(cardId);

    return res.send(deletedElement);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(VALIDATION_ERROR).send({
        message: 'Некорректный запрос',
      });
    }

    handleError(err, res);
  }

  return null;
};

const putLikeCard = (req, res, updateData) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND_ERROR)
          .send({
            message: `Карточка с указанным _id не найдена ${NOT_FOUND_ERROR}`,
          });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR).send({
          message: 'Некорректный запрос',
        });
      }
      return handleError(err, res);
    });
  return null;
};

const likeCard = (req, res) => {
  const owner = req.user._id;
  const newData = { $addToSet: { likes: owner } };
  putLikeCard(req, res, newData);
};

const dislikeCard = (req, res) => {
  const owner = req.user._id;
  const newData = { $pull: { likes: owner } };
  putLikeCard(req, res, newData);
};

module.exports = {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
};
