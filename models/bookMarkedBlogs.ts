import mongoose from "mongoose";
import { Blog } from "./blogsModels";
import { User } from "./userModels";

const bookMarkedBlogsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Blog,
    },
  },
  { timestamps: true }
);

const BookMarkedBlogs =
  mongoose.models?.BookMarkedBlogs ||
  mongoose.model("BookMarkedBlogs", bookMarkedBlogsSchema);

export { BookMarkedBlogs };
