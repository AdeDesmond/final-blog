import mongoose from "mongoose";
import { Blog } from "./blogsModels";
import { User } from "./userModels";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Blog,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    subComments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);

export { Comment };
