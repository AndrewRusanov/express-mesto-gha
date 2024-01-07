import User from "../models/User.js";

export const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((error) =>
      res.status(500).send({ message: `Ошибка сервера: ${error}` })
    );
};

export const getUsersById = (req, res) => {
  res.status(200).send({ message: "getUsersById" });
};

export const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => {
      res.status(500).send({ message: "Прозошла ошибка" });
    });
};
