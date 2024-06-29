import { Posts } from "../models/posts.model.js";

// all post sending to client side...................
const getAllPostsController = async (req, res) => {
  try {
    const allPosts = await Posts.find();
    if (!allPosts) {
      console.log("post not found..........");
      return res.status(404).json({ massage: "No post found" });
    }
    console.log("post sended.......");
    return res.status(200).json(allPosts);
  } catch (error) {
    return res.status(401).json({ massage: "posts getting error: ", error });
  }
};

// post data sending to client side using post id................
const getPostController = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findOne({ _id:id });
    if (!post) {
      return res.status(404).json({ massage: "No post found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(401).json({ massage: "post getting error: ", error });
  }
};

export { getAllPostsController, getPostController };
