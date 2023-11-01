require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors: errorCelebrate } = require('celebrate');
const router = require('./routes/index');
const handlerErrors = require('./middlewares/handlerErrors');
const { PORT, MONGODB } = require('./config');

const app = express();
mongoose.connect(MONGODB);

app.use(cookieParser());
app.use(express.json());
app.use('/', router);
app.use(errorCelebrate());
app.use(handlerErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
