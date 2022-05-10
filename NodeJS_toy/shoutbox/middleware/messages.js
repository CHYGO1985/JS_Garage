/**
 *
 * Put locals.messages data to session to avoid loss during redirecting.
 *
 * @author jingjiejiang
 * @history May 6, 2022
 *
 */
function message(req) {
  return (msg, type) => {
    const newType = type || 'info';
    const { session } = req;
    session.messages = session.messages || [];
    session.messages.push({ newType, string: msg });
  };
}

module.exports = (req, res, next) => {
  res.message = message(req);
  res.error = (msg) => res.message(msg, 'error');
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };
  next();
};
