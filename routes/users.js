import { Router } from "express";
import {
  createUsers,
  editUserAvatar,
  editUserInfo,
  getUsers,
  getUsersById,
} from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUsersById);
userRouter.post("/", createUsers);
userRouter.patch("/me", editUserInfo);
userRouter.patch("/me/avatar", editUserAvatar);

export default userRouter;
