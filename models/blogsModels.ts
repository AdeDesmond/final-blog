import mongoose from "mongoose";
import { Category } from "./categoryModel";
import { User } from "./userModels";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isBookmarked: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models?.Blog || mongoose.model("Blog", blogSchema);

export { Blog };
