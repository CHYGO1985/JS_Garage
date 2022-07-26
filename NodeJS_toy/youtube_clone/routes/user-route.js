const express = require('express');
const UserController = require('../controllers/user-controller');

const router = express.Router();

router.get('/test', (req, res) => {
  UserController.test();
  res.json('it is successful');
});

module.exports = router;
