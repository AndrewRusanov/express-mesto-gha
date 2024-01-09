import User from "../models/User.js";
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require("http2").constants;

// HTTP_STATUS_OK 200 Запрос успешно выполнен.
// HTTP_STATUS_CREATED 201 Запрос выполнен и привел к созданию нового ресурса.
// HTTP_STATUS_BAD_REQUEST 400 Не удалось обработать запрос сервером из-за недопустимого синтаксиса.
// HTTP_STATUS_NOT_FOUND 404 Сервер не нашел ничего, что соответствует запрошенным URI.
// HTTP_STATUS_INTERNAL_SERVER_ERROR 500 Internal Server Error.

export const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(HTTP_STATUS_OK).send(data))
    .catch((error) =>
      res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `Ошибка сервера: ${error}` })
    );
};

export const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: "Пользователь с таким ID не найден" });
        return;
      }
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.mssage })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error}` })
    );
};

export const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(HTTP_STATUS_CREATED).send(user))
    .catch((error) =>
      error.message === "ValidationError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error}` })
    );
};

export const editUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error}` })
    );
};

export const editUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: "true", runValidators: true }
  )
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error}` })
    );
};
