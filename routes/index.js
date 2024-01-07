import { Router } from "express";
import userRouter from "./users.js";
import cardsRouter from "./cards.js";

const router = Router();

router.use("/users", userRouter);
router.use("/cards", cardsRouter);

export default router;
