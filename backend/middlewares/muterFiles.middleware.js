import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const storage = multer.diskStorage({});

const uploads = multer({ storage });

cloudinary.config({
  cloud_name: "dyrnc1z2s",
  api_key: "351585889764763",
  api_secret: "5aRJzEPtXRJkm3974K0oSFTa-BY",
});

const uploadtoCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const response = await cloudinary.uploader.upload(filePath);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { uploads, uploadtoCloudinary };
