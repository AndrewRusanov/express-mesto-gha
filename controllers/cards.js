import Card from "../models/Card.js";

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

export const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(HTTP_STATUS_OK).send(data))
    .catch((error) =>
      res
        .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: `Ошибка сервера: ${error}` })
    );
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate("owner")
        .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
        .catch((error) =>
          error.name === "CastError"
            ? res
                .status(HTTP_STATUS_BAD_REQUEST)
                .send({ message: error.message })
            : res
                .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .send({ message: `Ошибка сервера: ${error}` })
        );
    })
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error.message}` })
    );
};

export const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(HTTP_STATUS_NOT_FOUND).send({ message: error.message });
        return;
      }
      res.status(HTTP_STATUS_OK).send({ message: "Карточка удалена" });
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error.message}` })
    );
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: "Карточки с таким ID нет" });
        return;
      }
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error.message}` })
    );
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res
          .status(HTTP_STATUS_NOT_FOUND)
          .send({ message: "Карточки с таким ID нет" });
        return;
      }
      res.status(HTTP_STATUS_OK).send(card);
    })
    .catch((error) =>
      error.name === "CastError"
        ? res.status(HTTP_STATUS_BAD_REQUEST).send({ message: error.message })
        : res
            .status(HTTP_STATUS_INTERNAL_SERVER_ERROR)
            .send({ message: `Ошибка сервера: ${error.message}` })
    );
};
