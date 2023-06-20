const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCards);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;
