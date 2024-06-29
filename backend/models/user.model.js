import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    phoneNumber:{
      type: String,
      required: true,
      unique: true,
    },
    userImage: {
      public_id:{
        type: String,
        required: true,
      },
      url:{
        type: String,
        required: true,
      }
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// passwords bcrypt to secure..................
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, saltRound);
    this.password = hashedPassword;
  } catch (error) {
    next(error);
  }
});

// compare passwords.....................
userSchema.methods.comparePassword = async function (password,next) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // console.log(error);
    next(error)
  }
};

// json web token................................
userSchema.methods.genarateToken = async function (next) {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        isAdmin: this.isAdmin,
        email: this.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    // console.log(error);
    next(error)
  }
};

export const User = mongoose.model("User", userSchema);
