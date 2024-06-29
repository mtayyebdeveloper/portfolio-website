import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: false,
    },
    gender: {
      type: String,
      required: true,
      default: "other",
    },
    country: {
      type: String,
      required: true,
    },
    massage: {
      type: String,
      required: true,
      default: "Hello M Tayyeb",
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
