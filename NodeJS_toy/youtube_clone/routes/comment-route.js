import express from 'express';
import {
  addComment,
  deleteComment,
  getCommentsByVideoId
} from '../controllers/comment-controller.js';
import { verifyToken } from '../middleware/verify-token.js';

const router = express.Router();

router.post('/', verifyToken, addComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/video/:videoId', getCommentsByVideoId);

export default router;
