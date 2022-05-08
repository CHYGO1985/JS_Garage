/**
 * 
 * The pagination middleware for posts.
 * 
 * @author jingjiejiang
 * @history May 8, 2022
 * 
 */
module.exports = (cb, perpage) => {
  perpage = perpage || 10;
  return async (req, res, next) => {
    let page = Math.max(
      parseInt(req.params.page || '1', 10), 1
    ) - 1;

    try {
      const total = await cb();
      req.page = res.locals.page = {
        number: page,
        perpage: perpage,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      };
      next();
    } catch(err) {
      next(err);
    }
  }
};