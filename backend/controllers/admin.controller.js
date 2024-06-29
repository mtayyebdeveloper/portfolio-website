import { User } from "../models/user.model.js";
import { Contact } from "../models/contact.model.js";
import { Posts } from "../models/posts.model.js";
import { uploadtoCloudinary } from "../middlewares/muterFiles.middleware.js";
import bcrypt from "bcryptjs";

// getting all users from database and sending it to client..........
const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || User.length === 0) {
      return res.status(404).json({ massage: "No users found.." });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(404)
      .json({ massage: "users data fatching error: ", error });
  }
};

// getting all contacts from database and sending it to client..........
const getAllContactsController = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (!contacts || Contact.length === 0) {
      return res.status(404).json({ massage: "No contacts found.." });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    return res
      .status(404)
      .json({ massage: "contacts data fatching error: ", error });
  }
};

// checking current user that this is admin or not............
const getAdminController = async (req, res) => {
  try {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res.status(403).json({ massage: "You are not admin..." });
    }
    return res.status(200).json(isAdmin);
  } catch (error) {
    return res
      .status(404)
      .json({ massage: "admin data fatching error: ", error });
  }
};

// Post creating data geting from frontend client side and saving to database.............
const PostsController = async (req, res) => {
  const file = req.file;
  const { title, description, catagore } = req.body;
  try {
    if (!file) {
      return res.status(201).json({ massage: "post image not found" })
    }
    if (!title || !description || !catagore) {
      return res.status(201).json({ massage: "please fill the feilds" })
    }
    const img = await uploadtoCloudinary(file.path)

    const post = await Posts.create({
      title: title,
      description: description,
      image: img.url,
      catagore: catagore,
      auther: {
        id: req.user._id,
        username: req.user.username,
        createDate: new Date().toLocaleString(),
      },
    });
    if (!post) {
      return res.status(404).json({ massage: "No post found" });
    }
    return res.status(200).json({massage:"post created successfully",post});
  } catch (error) {
    return res.status(401).json({ massage: "posting error: ", error });
  }
};

// Deleting user by id .. id getting from client side.........
const deleteUserbyID = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ massage: "User deleted successfully" });
  } catch (error) {
    return res.status(401).json({ massage: "User deleting error: ", error });
  }
};

// Deleting contact by id .. id getting from client side.........
const deleteContactbyID = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ massage: "Contact deleted successfully" });
  } catch (error) {
    return res.status(401).json({ massage: "Contact deleting error: ", error });
  }
};

// Deleting posts by id .. id getting from client side.........
const deletePostsbyID = async (req, res) => {
  try {
    const id = req.params.id;
    await Posts.deleteOne({ _id: id });
    return res.status(200).json({ massage: "post deleted successfully..." });
  } catch (error) {
    return res.status(401).json({ massage: "post deleting error: ", error });
  }
};

// getting all posts from database and sending it to admin client side..........
// sorry this is getallpostscontroller my mistack
const getAllPostsContainer = async (req, res) => {
  try {
    const allposts = await Posts.find();
    if (!allposts) {
      return res.status(404).json({ massage: "No post found" });
    }
    return res.status(200).json(allposts);
  } catch (error) {
    return res
      .status(401)
      .json({ massage: "getting all posts error: ", error });
  }
};

// updating all users data in database data getting from client side....................
const updateAllUsersData = async (req, res) => {
  const file = req.file;
  const { username, password, phoneNumber, email } = req.body;
  const _id = req.params.id;
  try {

    if (!_id) {
      return res.status(201).json({ massage: "id is not found" })
    }

    if (!file) {
      return res.status(201).json({ massage: "user image not found" })
    }

    if (!username || !password || !phoneNumber || !email) {
      return res.status(201).json({ massage: "please fill the feilds" })
    }

    const saltRound = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, saltRound);

    const img = await uploadtoCloudinary(file.path)

    const updateUser = await User.findByIdAndUpdate(
      { _id },
      {
        username,
        password: bcryptPassword,
        userImage: img.url,
        phoneNumber,
        email,
      }
    );
    if (updateUser) {
      return res
        .status(200)
        .json({ "user updated successfully..": updateUser });
    }
    return res.status(404).json({ massage: "No user found" });
  } catch (error) {
    return res.status(401).json({ "users updating error:": error });
  }
};

// sending posts data to admin for updating using post id.................
const sendPostsDataController = async (req, res) => {
  try {
    const id = req.params.id;
    const getPostData = await Posts.findOne({ _id: id });
    if (getPostData) {
      return res.status(200).json(getPostData);
    }
    return res.status(404).json({ massage: "No post found" });
  } catch (error) {
    return res.status(401).json({ "sending posts data error:": error });
  }
};

// updating posts in database using id..................................
const UpdatePostsController = async (req, res) => {
  try {
    const postData = req.body;
    const _id = req.params.id;
    const updatePost = await Posts.updateOne({ _id }, { $set: postData });
    if (updatePost) {
      return res
        .status(200)
        .json({ "post updated successfully..": updatePost });
    }
    return res.status(404).json({ massage: "No post found" });
  } catch (error) {
    return res.status(401).json({ "Posts updating error:": error });
  }
};

export {
  getAllUsersController,
  getAllContactsController,
  getAdminController,
  PostsController,
  deleteUserbyID,
  deleteContactbyID,
  getAllPostsContainer,
  deletePostsbyID,
  updateAllUsersData,
  UpdatePostsController,
  sendPostsDataController,
};
