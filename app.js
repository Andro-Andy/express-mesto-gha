require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors: errorCelebrate } = require('celebrate');
const router = require('./routes/index');
const handlerErrors = require('./middlewares/handlerErrors');
const { SERVER_ERROR } = require('./utils/constants');
const { PORT, MONGODB } = require('./config');

const app = express();
mongoose.connect(MONGODB);

app.use(cookieParser());
app.use(express.json());
app.use('/', router);
app.use(errorCelebrate());
app.use(handlerErrors);

app.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERVER_ERROR ? 'Ошибка на сервере' : message,
    });

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
