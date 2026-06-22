import express from 'express';

import { verifyToken } from '../../middleware/verify-token.js';
import {
  deleteUser,
  dislikeUser,
  getUser,
  likeUser,
  subscribeUser,
  unsubscribeUser,
  updateUser,
} from './user.controller.js';

const router = express.Router();

router.put('/:id/subscription', verifyToken, subscribeUser);
router.delete('/:id/subscription', verifyToken, unsubscribeUser);
router.get('/find/:id', getUser);
router.put('/sub/:id', verifyToken, subscribeUser);
router.put('/unsub/:id', verifyToken, unsubscribeUser);
router.put('/like/:videoId', verifyToken, likeUser);
router.put('/dislike/:videoId', verifyToken, dislikeUser);

router.get('/:id', getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router;
