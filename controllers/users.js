import User from "../models/User.js";

export const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((error) =>
      res.status(500).send({ message: `Ошибка сервера: ${error}` })
    );
};

export const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "Пользователь с таким ID не найден" });
        return;
      }
      res.send(user);
    })
    .catch(() =>
      res.status(404).send({ message: "Пользователь с таким ID не найден" })
    );
};

export const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((error) =>
      error.message === "ValidationError"
        ? res.status(400).send({ message: error.message })
        : res.status(404).send({ message: "Пользователь с таким ID не найден" })
    );
};

export const editUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((error) =>
      error.name === "ValidationError"
        ? res.status(400).send({ message: error.message })
        : res
            .status(404)
            .send({ message: "Пользователь по указанному ID не найден" })
    );
};

export const editUserAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: "true", runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: err.message });
      } else {
        res
          .status(404)
          .send({ message: "Пользователь по указанному ID не нйден" });
      }
    });
};
