import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    catagore: {
      type: String,
      required: true,
      default: "UnCatagorized",
    },
    auther: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      username: String,
      createDate: String,
    },
  },
  { timestamps: true }
);

export const Posts = mongoose.model("Posts", postsSchema);
