const process = require("process");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// сервер на Экспресс
const express = require("express");

const helmet = require("helmet");

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

// экспортируем роутеры
const router = require("./routes/index");

app.use(helmet());

mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb")
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "",
  };

  next();
});

app.use("/", router);

process.on("uncaughtException", (err, origin) => {
  console.log(
    `${origin} ${err.name} c текстом ${err.message} не была обработана. Обратите внимание!`
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(BASE_PATH);
});
