import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  likeUser,
  dislikeUser
} from '../controllers/user-controller.js';
import { verifyToken } from '../middleware/verify-token.js';

const router = express.Router();

// update a user
router.put('/:id', verifyToken, updateUser);

// delete a user
router.delete('/:id', verifyToken, deleteUser);

// get the info of a user
router.get('/find/:id', getUser);

// subscribe a user
router.put('/sub/:id', verifyToken, subscribeUser);

// unsunscribe a user
router.put('/unsub/:id', verifyToken, unsubscribeUser);

// like a video
router.put('/like/:id', verifyToken, likeUser);

// dislike a video
router.put('/dislike/:videoId', verifyToken, dislikeUser);

export default router;
