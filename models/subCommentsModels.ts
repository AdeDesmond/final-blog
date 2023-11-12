import mongoose from "mongoose";
import { Comment } from "./commentModels";
import { User } from "./userModels";
import { Blog } from "./blogsModels";

const subCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Comment,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Blog,
      required: true,
    },
    subComment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubComment =
  mongoose.models.SubComment || mongoose.model("SubComment", subCommentSchema);
