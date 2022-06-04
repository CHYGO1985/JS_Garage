/**
 *
 * Upload a file and update data in DB.
 *
 * @author jingjiejiang
 * @history Jun 3, 2022
 *
 */
/* use express-fileupload */
// const path = require('path');

// module.exports = (pool) => (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   const { uploadedFile } = req.files;
//   const uploadedPath = path.join(__dirname, '../', 'upload', uploadedFile.name);

//   console.log(uploadedFile);

//   // use mv() to place file on the server
//   uploadedFile.mv(uploadedPath, (err) => {
//     if (err) res.status(500).send(err);

//     pool.getConnection((error, connection) => {
//       if (error) throw error; // not connected
//       console.log('MYSQL Connected');

// eslint-disable-next-line max-len
//       connection.query('UPDATE user SET profile_image = ? where id = "1"', [uploadedFile.name], (err1) => {
//         connection.release();
//         if (!err1) {
//           res.redirect('/');
//         } else {
//           console.log(err1);
//         }
//       });
//     });
//   });

//   return null;
// };

/* Use multer */
module.exports = (pool) => (req, res) => {
  if (!req.file || Object.keys(req.file).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.file;
  console.log(uploadedFile);

  pool.getConnection((error, connection) => {
    if (error) throw error; // not connected
    console.log('MYSQL Connected');

    connection.query('UPDATE user SET profile_image = ? where id = "1"', [uploadedFile.filename], (err1) => {
      connection.release();
      if (!err1) {
        res.redirect('/');
      } else {
        console.log(err1);
      }
    });
  });

  return null;
};
