export const getUsers = (req, res) => {
  res.status(200).send({ message: "getUsers" });
};

export const getUsersByid = (req, res) => {
  res.status(200).send({ message: "getUsersByid" });
};

export const createUsers = (req, res) => {
  res.status(200).send({ message: "createUsers" });
};
