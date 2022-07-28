import express from 'express';
import {
  test,
  updateUser,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike
} from '../controllers/user-controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/test', test);

// update a user
router.put('/:id', verifyToken, updateUser);

// delete a user
router.delete('/:id', verifyToken, deleteUser);

// get the info of a user
router.get('/find/:id', getUser);

// subscribe a user
router.put('/sub/:id', verifyToken, subscribe);

// unsunscribe a user
// ??? why use put not delete?

// like a video

// dislike a video

export default router;
