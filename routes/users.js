import { Router } from "express";
import { createUsers, getUsers, getUsersByid } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUsersByid);

userRouter.post("/", createUsers);

export default userRouter;
