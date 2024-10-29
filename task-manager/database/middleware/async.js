const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(res, res, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = asyncWrapper;
