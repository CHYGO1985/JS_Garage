import express from 'express';

import { verifyToken } from '../../middleware/verify-token.js';
import {
  addComment,
  deleteComment,
  getCommentsByVideoId,
} from './comment.controller.js';

const router = express.Router();

router.post('/', verifyToken, addComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/video/:videoId', getCommentsByVideoId);

export default router;
