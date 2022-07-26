/**
 *
 * The route for 404 error.
 *
 * @author jingjiejiang
 * @history Jun 14, 2022
 *
 */
export default (req, res) => {
  res.status(404).render('not-found', {
    title: '404 Not Found',
    message: 'Sorry, the page does not exist.',
  });
};
