/**
 *
 * The pagination middleware for posts.
 *
 * @author jingjiejiang
 * @history May 8, 2022
 *
 */
module.exports = (cb, perpage) => {
  const perPage = perpage || 10;
  return async (req, res, next) => {
    // req.params.page from api/entries/:page?
    const page = Math.max(parseInt(req.params.page || '1', 10), 1) - 1;

    try {
      const total = await cb();
      req.page = {
        number: page,
        perpage: perPage,
        from: page * perPage,
        to: page * perPage + perPage - 1,
        total,
        count: Math.ceil(total / perPage),
      };
      res.locals.page = req.page;
      next();
    } catch (err) {
      next(err);
    }
  };
};
