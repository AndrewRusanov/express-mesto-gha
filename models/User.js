import mongoose, { Schema } from "mongoose";

const userScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Минимальная длина поля name: 2 символа "],
      maxlength: [30, "Максимальная длина поля name: 30 символв "],
    },
    about: {
      type: String,
      required: true,
      minlength: [2, "Минимальная длина поля about: 2 символа "],
      maxlength: [30, "Максимальная длина поля about: 30 символв "],
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model("user", userScheme);
