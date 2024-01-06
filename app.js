import express from "express";
import router from "./routes/index.js";


const { PORT = 3000 } = process.env;
const app = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
