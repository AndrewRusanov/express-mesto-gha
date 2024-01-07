import express from "express";
import router from "./routes/index.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: "659a517f79caad48ae078cc9",
  };
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
