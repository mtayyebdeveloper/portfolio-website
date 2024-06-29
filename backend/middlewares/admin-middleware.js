const adminMiddleware = async (req, res, next) => {
  try {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
      return res.status(403).json({ massage: "You are not admin..." });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { adminMiddleware };
