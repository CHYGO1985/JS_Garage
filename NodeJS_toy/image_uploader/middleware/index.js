/**
 *
 * @author jingjiejiang
 * @history Jun 2, 2022
 *
 * @param {*} pool
 * @returns
 */
module.exports = (pool) => (req, res, next) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected!');

    connection.query('SELECT * FROM user WHERE id = "1"', (error, rows) => {
      // Once done, release connection
      connection.release();
      if (!error) {
        res.render('index', {
          title: 'File Uploader',
          rows,
        });
      }
      next();
    });
  });
};
