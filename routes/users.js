import { Router } from "express";
import { createUsers, getUsers, getUsersById } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:userId", getUsersById);

userRouter.post("/", createUsers);

export default userRouter;
