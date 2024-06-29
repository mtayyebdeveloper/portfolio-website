const errorThrowingMiddleware = async (err, req, res, next) => {
  const status = err.status || 500;
  const massage = err.massage || "BACKEND ERROR";
  return res.status(status).json(massage);
};

export { errorThrowingMiddleware };
