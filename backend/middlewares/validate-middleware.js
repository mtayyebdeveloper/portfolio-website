const validateMiddleware = (authSchema) => async (req, res, next) => {
  try {
    const parsBody = await authSchema.parseAsync(req.body);
    req.body = parsBody;
    return next();
  } catch (err) {
    return res.status(401).json({ massage: err });
  }
};

export default validateMiddleware;
