import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


const authUserMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ massage: "token not provided" });
  }
  try {
    const userToken = token.replace("token", "").trim();
    const verifiedToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    const userData = await User.findOne({ email: verifiedToken.email }).select({
      password: 0,
    });
    req.user = userData;
    req.token = userToken;
    req.userID = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({ massage: "token not valid" });
  }
};

export { authUserMiddleware };
