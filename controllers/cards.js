import Card from "../models/Card.js";

export const getCards = (req, res) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((error) =>
      res.status(500).send({ message: `Ошибка сервера: ${error}` })
    );
};

export const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .then((data) => res.send(data))
        .catch(() =>
          res.status(404).send({ message: "Карточки с таким ID нет" })
        );
    })
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(400).send({ message: error.message })
        : res.status(500).send({ message: `Ошибка сервера: ${error.message}` })
    );
};

export const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточки с таким Id нет" });
        return;
      }
      res.send({ message: "Карточка удалена" });
    })
    .catch(() => res.status(404).send({ message: "Карточки с таким Id нет" }));
};

export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточки с таким ID нет" });
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(404).send({ message: "Карточки с таким ID нет" }));
};

export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточки с таким ID нет" });
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(404).send({ message: "Карточки с таким ID нет" }));
};
