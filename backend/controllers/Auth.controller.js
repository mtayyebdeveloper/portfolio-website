import { User } from "../models/user.model.js";
import { uploadtoCloudinary } from "../middlewares/muterFiles.middleware.js"
import bcrypt from "bcryptjs";

// signup controlling code ................................
const signupController = async (req, res, next) => {
  const file = req.file;
  const { username, email, password, phoneNumber } = req.body;
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(401).json({ massage: "User alredy exist." });
    } else {
      const img = await uploadtoCloudinary(file.path)
      await User.create({
        username,
        email,
        password,
        phoneNumber,
        userImage: {
          public_id: img.public_id,
          url: img.url
        }
      });
      return res.status(200).json({
        massage: "User created successfully.",
      });
    }
  } catch (error) {
   return res.status(401).json({ massage: "User creating error: ", error });
  }
};

// login controlling code................................
async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const userdata = await User.findOne({ email });

    if (!userdata) {
      return res.status(401).json({ massage: "You enterd wrong email" });
    }

    const isMatch = await userdata.comparePassword(password);

    if (isMatch) {
      return res.status(200).json({
        massage: "login success",
        jsonWebToken: await userdata.genarateToken(),
        userID: userdata._id.toString(),
      });
    } else {
      return res.status(401).json({ massage: "Password dose not match" });
    }
  } catch (error) {
    return res.status(401).json({ massage: "login error: ", error });
  }
}

const userController = (req, res, next) => {
  try {
    const allUserData = req.user;
    return res.status(200).json({ allUserData });
  } catch (error) {
    // return console.log("error fron user data: ", error);
    next(error)
  }
};

const UpdateSingleUserById = async (req, res) => {
  const file =req.file;
  const _id = req.user._id;
  const {username,email,phoneNumber} = req.body;
  try {
    if(!_id){
      return res.status(201).json({ massage: "user id not found" });
    }
    if (!file) {
      return res.status(201).json({ massage: "user image not found" });
    }

    if (!username || !email || !phoneNumber) {
      return res.status(201).json({ massage: "please fill the feilds" });
    }
    console.log("ready to update...");

    const img =await uploadtoCloudinary(file.path)

    const updateData = await User.findOneAndUpdate(
      { _id },
      {
        username,
        email,
        phoneNumber,
        userImage:{
          public_id:img.public_id,
          url:img.url
        }
      }
    );
    if (!updateData) {
      return res.status(201).json({massage: "user not updated.."});
    }
    return res.status(200).json({massage: "user updated..", updateData });
  } catch (error) {
    return res.status(401).json(error);
  }
};

const updateSingleUserPassword = async (req, res) => {
  try {
    const { oldPassword, password } = req.body;
    const _id = req.user._id;
    const user = await User.findOne({ _id});
    const isCorrectPass = await user.comparePassword(oldPassword);
    if (!isCorrectPass) {
      return res.status(401).json("Old password is not correct");
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const updatedUser = await User.updateOne(
      { _id },
      {
        $set: { password: hashedPassword },
      }
    );
    if (updatedUser) {
      return res.status(200).json({massage:"User password updated successfully..."});
    }
    return res.status(201).json({massage:"User password not updated.."});
  } catch (error) {
    return res.status(401).json({ "User password updating errer: ": error });
  }
};

export {
  signupController,
  loginController,
  userController,
  UpdateSingleUserById,
  updateSingleUserPassword,
};
