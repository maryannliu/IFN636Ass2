const errorHandler = (err, res) => {
  console.error(err.stack);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  let message = err.message || 'Server Error';


  res.status(statusCode).json({
    status: statusCode,
    message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

const handleNotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  errorHandler,
  handleNotFound,
};