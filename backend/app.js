const express = require("express");
const mongoose = require("mongoose");
const { celebrate, Joi } = require("celebrate");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
require("dotenv").config();
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/not-found-error");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, DB_PATH = "mongodb://127.0.0.1:27017/mestodb" } =
  process.env;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://pr15.bordakov.nomoredomainsmonster.ru",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(DB_PATH);

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);

app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .min(2)
        .max(30)
        .regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

app.use(auth);
app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use("*", (req, res, next) => {
  next(new NotFoundError("Данной страницы не существует"));
});

app.use(errorLogger);

// Обработка ошибок Celebrate
app.use(errors());

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT);
