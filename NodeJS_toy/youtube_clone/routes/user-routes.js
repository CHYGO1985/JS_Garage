const express = require('express');
const UserController = require('../controller/user-controller');

const router = express.Router();

router.get('/test', (req, res) => {
  UserController.test();
});

module.exports = router;
